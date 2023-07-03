import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { faker } from '@faker-js/faker'; // use for fake item title.

// DEV only to simulate slow connection without throttling bandwidth.
const pause = duration => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
};

const albumsApi = createApi({
  // lots of configs. ok to break it up into separate files.
  // it will automatically generates a slice bts.
  reducerPath: 'albums', // can be gibberish as long as it's unique.
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3005',
    fetchFn: async (...args) => {
      // override the fetch function that rtkq uses.
      // ** REMOVE FOR PRODUCTION
      await pause(1000);
      return fetch(...args);
    },
  }),
  endpoints(builder) {
    // return an object with details about our request configs.
    return {
      removeAlbum: builder.mutation({
        invalidatesTags: (result, error, album) => {
          return [{ type: 'Album', id: album.id }];
        },
        query: album => {
          return {
            url: `/albums/${album.id}`,
            method: 'DELETE',
          };
        },
      }),
      addAlbum: builder.mutation({
        invalidatesTags: (result, error, user) => {
          // change to function instead of array of strings.
          // result, error, arg are automatic
          return [{ type: 'UsersAlbums', id: user.id }];
        }, // for auto-refetching
        query: user => {
          return {
            url: '/albums',
            method: 'POST',
            body: { userId: user.id, title: faker.commerce.productName() },
          };
        },
      }),
      fetchAlbums: builder.query({
        // don't change the key name above or hook name will change too.
        providesTags: (result, error, user) => {
          // result, error, arg automatic. result contains the data.
          // return [{ type: 'Album', id: user.id }];
          // update to include many more tags that can match
          // Any tag that matches will invalidate the request.
          // This is better than sending objects as props just to get their ID.
          const tags = result.map(album => {
            return { type: 'Album', id: album.id };
          });
          tags.push({ type: 'UsersAlbums', id: user.id });
          return tags;
        },
        query: user => {
          // user.name, user.id
          return {
            url: '/albums',
            params: {
              userId: user.id,
            },
            method: 'GET',
          };
        },
      }),
    };
  },
});

export const {
  useFetchAlbumsQuery,
  useAddAlbumMutation,
  useRemoveAlbumMutation,
} = albumsApi; // export auto-generated hooks (rtkq).
export { albumsApi };

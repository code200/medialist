import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { faker } from '@faker-js/faker'; // use for fake item title.

const albumsApi = createApi({
  // lots of configs. ok to break it up into separate files.
  // it will automatically generates a slice bts.
  reducerPath: 'albums', // can be gibberish as long as it's unique.
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3005',
  }),
  endpoints(builder) {
    // return an object with details about our request configs.
    return {
      addAlbum: builder.mutation({
        invalidatesTags: ['Album'], // for auto-refetching
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
        providesTags: ['Album'], // the string can be anything. used for auto-refetching.
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

export const { useFetchAlbumsQuery, useAddAlbumMutation } = albumsApi; // export auto-generated hook.
export { albumsApi };

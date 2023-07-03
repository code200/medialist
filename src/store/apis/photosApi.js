import { faker } from '@faker-js/faker'; // for fake photo names.
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { devPause } from '../../helpers';

const photosApi = createApi({
  // where state is held inside the store.
  reducerPath: 'photos', // can be gibberish as long as it's unique.
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3005',
    fetchFn: async (...args) => {
      // override the fetch function that rtkq uses.
      // ** REMOVE FOR PRODUCTION
      await devPause(1000);
      return fetch(...args);
    },
  }),
  endpoints(builder) {
    return {
      fetchPhotos: builder.query({
        providesTags: (result, error, album) => {
          const tags = result.map(photo => {
            return { type: 'Photo', id: photo.id };
          });
          tags.push({ type: 'AlbumPhoto', id: album.id });
          return tags;
        },
        query: album => {
          // need to provide an album object to the fetch hook
          // album.id, album.userId
          return {
            url: '/photos',
            params: {
              albumId: album.id,
            },
            method: 'GET',
          };
        },
      }),
      addPhoto: builder.mutation({
        invalidatesTags: (result, error, album) => {
          return [{ type: 'AlbumPhoto', id: album.id }];
        },
        query: album => {
          return {
            url: '/photos',
            body: {
              albumId: album.id,
              // url: faker.image.url,
              url: faker.image.abstract(150, 150, true),
            },
            method: 'POST',
          };
        },
      }),
      removePhoto: builder.mutation({
        invalidatesTags: (result, error, photo) => {
          return [{ type: 'Photo', id: photo.id }];
        },
        query: photo => {
          return {
            url: `/photos/${photo.id}`,
            method: 'DELETE',
          };
        },
      }),
    };
  },
});

export const {
  useFetchPhotosQuery,
  useAddPhotoMutation,
  useRemovePhotoMutation,
} = photosApi;
export { photosApi };

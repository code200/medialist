import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { usersReducer } from './slices/usersSlice';
import { albumsApi } from './apis/albumsApi';
import { photosApi } from './apis/photosApi';
// rtkq: slice is generated automatically when we create api.
// that slice creates reducer(s).
// a set of middleware is also created.

const store = configureStore({
  reducer: {
    users: usersReducer,

    // for RTK-Q. keys come from reducerPath property.
    [albumsApi.reducerPath]: albumsApi.reducer, // this version avoids magic strings / misspellings.
    [photosApi.reducerPath]: photosApi.reducer,
  },
  middleware: getDefaultMiddleware => {
    // just a required part of rtkq setup
    return getDefaultMiddleware()
      .concat(albumsApi.middleware)
      .concat(photosApi.middleware);
  },
});

setupListeners(store.dispatch); // one time setup for rtkq

export { store };
export * from './thunks/fetchUsers'; // export everything that's exported from fetchUsers.js.
export * from './thunks/addUser';
export * from './thunks/removeUser';

export {
  useFetchAlbumsQuery,
  useAddAlbumMutation,
  useRemoveAlbumMutation,
} from './apis/albumsApi'; // rtkq hooks

export {
  useFetchPhotosQuery,
  useAddPhotoMutation,
  useRemovePhotoMutation,
} from './apis/photosApi'; // rtkq hooks

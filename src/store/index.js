import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { usersReducer } from './slices/usersSlice';
import { albumsApi } from './apis/albumsApi';

const store = configureStore({
  reducer: {
    users: usersReducer,
    // albums: albumsApi.reducer, // albums key comes from albumsApi reducerPath.
    [albumsApi.reducerPath]: albumsApi.reducer, // this version avoids magic strings / misspellings.
  },
  middleware: getDefaultMiddleware => {
    // just a required part of rtkq setup
    return getDefaultMiddleware().concat(albumsApi.middleware);
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

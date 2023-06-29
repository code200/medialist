import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// first param is 'base type', thunk will append slash 'pending', 'fulfilled', 'rejected' to it.
const fetchUsers = createAsyncThunk('users/fetch', async () => {
  const response = await axios.get('http://localhost:3005/users');

  // TODO: DEV only to test loading spinner - delete before release.
  await pause(1000);

  // magic:
  return response.data; // assigned to the payload property of the fulfilled action type.
});

// DEV only to simulate slow connection without throttling bandwidth.
const pause = duration => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
};

export { fetchUsers };

// 3 properties automatically added to fetchUsers so we can avoid magic strings:
// fetchUsers.pending === 'users/fetch/pending' (loading)
// fetchUsers.fulfilled === 'users/fetch/fulfilled' (success)
// fetchUsers.rejected === 'users/fetch/rejected' (error)

// if error, thunk will dispatch an action with an error object as the payload.

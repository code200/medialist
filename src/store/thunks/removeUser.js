import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const removeUser = createAsyncThunk('users/remove', async user => {
  // pass in user object.
  await axios.delete(`http://localhost:3005/users/${user.id}`, {
    data: { id: user.id },
  });

  // whatever is returned here goes into the fulfilled action payload.
  // return user instead of response.data for a delete request because
  // the returning payload is an empty object.
  return user;
});

export { removeUser };

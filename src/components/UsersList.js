import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, addUser } from './../store';
import Button from './Button';
import Skeleton from './Skeleton';

function UsersList() {
  const [isLoadingUsers, setIsLoadingUsers] = useState(false); // show skeletons when true
  const [loadingUsersError, setLoadingUsersError] = useState(null); // show err msg when not null.
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const [creatingUserError, setCreatingUserError] = useState(null);

  const dispatch = useDispatch();
  const { data } = useSelector(state => state.users);

  useEffect(() => {
    setIsLoadingUsers(true);
    dispatch(fetchUsers())
      // dispatch returns a Promise with broken .then/.catch rules.
      // .then is always called whether success or failure.
      // argument to .then is fulfilled or rejected action object.
      .unwrap() // hack to 'fix' the promise
      .then(() => {
        console.log('success');
      })
      .catch(error => {
        console.log('failed');
        setLoadingUsersError(error);
      })
      .finally(() => {
        // called if request succeeds or fails.
        setIsLoadingUsers(false);
      });
  }, [dispatch]);

  // height of 10px, width of 100%.
  if (isLoadingUsers) return <Skeleton howMany={5} className="h-10 w-full" />;
  if (loadingUsersError)
    return <p>Error fetching data: {loadingUsersError.message}</p>;

  const renderedUsers = data.map((user, idx) => {
    return (
      <div key={user.id} className="mb-2 border rounded">
        <div className="flex p-2 justify-between items-center cursor-pointer">
          {user.name}
        </div>
      </div>
    );
  });

  const handleUserAdd = () => {
    setIsCreatingUser(true);
    dispatch(addUser())
      .unwrap() // hack to fix broken Promise returned from dispatch.
      .catch(error => setCreatingUserError(error))
      .finally(() => setIsCreatingUser(false));
  };

  return (
    <div>
      <div className="flex flex-row justify-between m-3">
        <h1 className="m-2 text-xl">Users</h1>
        {isCreatingUser ? (
          'Creating User...'
        ) : (
          <Button onClick={handleUserAdd}>+ Add User</Button>
        )}
        {creatingUserError &&
          `Error creating user: ${creatingUserError.message}`}
      </div>

      {renderedUsers}
    </div>
  );
}

export default UsersList;

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchUsers, addUser } from './../store';
import Button from './Button';
import Skeleton from './Skeleton';
import { useThunk } from './../hooks/use-thunk';

function UsersList() {
  const [doFetchUsers, isLoadingUsers, loadingUsersError] =
    useThunk(fetchUsers);

  const [doCreateUser, isCreatingUser, creatingUserError] = useThunk(addUser);

  const { data } = useSelector(state => state.users);

  useEffect(() => {
    doFetchUsers();
  }, [doFetchUsers]);

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
    doCreateUser();
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

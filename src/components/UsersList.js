import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchUsers, addUser } from './../store';
import Button from './Button';
import Skeleton from './Skeleton';
import { useThunk } from './../hooks/use-thunk';
import UsersListItem from './UsersListItem';

function UsersList() {
  const [doFetchUsers, isLoadingUsers, loadingUsersError] =
    useThunk(fetchUsers);

  const [doCreateUser, isCreatingUser, creatingUserError] = useThunk(addUser);

  const { data } = useSelector(state => state.users);

  useEffect(() => {
    doFetchUsers();
  }, [doFetchUsers]);

  let content;
  // height of 10px, width of 100%.
  if (isLoadingUsers)
    content = <Skeleton howMany={5} className="h-10 w-full" />;
  else if (loadingUsersError)
    content = <p>Error fetching data: {loadingUsersError.message}</p>;
  else {
    content = data.map((user, idx) => {
      return <UsersListItem user={user} key={user.id} />;
    });
  }

  const handleUserAdd = () => {
    doCreateUser();
  };

  return (
    <div>
      <div className="flex flex-row justify-between items-center m-3">
        <h1 className="m-2 text-xl">Users</h1>
        <Button loading={isCreatingUser} onClick={handleUserAdd}>
          + Add User
        </Button>

        {creatingUserError &&
          `Error creating user: ${creatingUserError.message}`}
      </div>

      {content}
    </div>
  );
}

export default UsersList;

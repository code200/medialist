import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, addUser } from './../store';
import Button from './Button';
import Skeleton from './Skeleton';

function UsersList() {
  const dispatch = useDispatch();
  const { data, isLoading, error } = useSelector(state => state.users);

  useEffect(() => {
    console.log(dispatch(fetchUsers()));
  }, [dispatch]);

  // height of 10px, width of 100%.
  if (isLoading) return <Skeleton howMany={5} className="h-10 w-full" />;
  if (error) return <p>{error.message}</p>;

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
    dispatch(addUser());
  };

  return (
    <div>
      <div className="flex flex-row justify-between m-3">
        <h1 className="m-2 text-xl">Users</h1>
        <Button onClick={handleUserAdd}>+ Add User</Button>
      </div>

      {renderedUsers}
    </div>
  );
}

export default UsersList;

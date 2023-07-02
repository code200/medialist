import React from 'react';
import { GoTrash } from 'react-icons/go';
import Button from './Button';
import { removeUser } from './../store';
import { useThunk } from './../hooks/use-thunk';
import ExpandablePanel from './ExpandablePanel';
import AlbumsList from './AlbumsList';

function UsersListItem({ user }) {
  // component to show one user from the list.
  // keep the state variable names simpler because it's a small component.
  const [doRemoveUser, isLoading, error] = useThunk(removeUser); // wrap up the removeUser thunk.

  const handleClick = () => {
    doRemoveUser(user);
  };
  const header = (
    <>
      <Button className="mr-3" loading={isLoading} onClick={handleClick}>
        <GoTrash />
      </Button>
      {Boolean(error) & '<div>Error deleting user</div>'}
      {user.name}
    </>
  );

  return (
    <ExpandablePanel header={header}>
      <AlbumsList user={user} />
    </ExpandablePanel>
  );
}

export default UsersListItem;

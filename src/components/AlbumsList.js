import { useFetchAlbumsQuery, useAddAlbumMutation } from './../store';
import Skeleton from './Skeleton';
import ExpandablePanel from './ExpandablePanel';
import Button from './Button';
import AlbumsListItem from './AlbumsListItem';

function AlbumsList({ user }) {
  // this will fetch all albums for a user. (rtkq)
  const { data, error, isFetching } = useFetchAlbumsQuery(user);
  const [addAlbum, results] = useAddAlbumMutation();

  const handleAddAlbum = () => {
    addAlbum(user);
  };

  let content;
  if (isFetching) content = <Skeleton className="h-10 w-full" howMany={2} />;
  else if (error) content = <div>Error loading albums</div>;
  else if (data) {
    content = data.map(album => {
      return <AlbumsListItem album={album} key={album.id} />;
    });
  }

  return (
    <>
      <div className="m-2 flex flex-row items-center justify-between">
        <h3 className="text-lg font-bold">Albums for {user.name}</h3>
        <Button loading={results.isLoading} onClick={handleAddAlbum}>
          + Add Album
        </Button>
      </div>
      <div>{content}</div>
    </>
  );
}

export default AlbumsList;

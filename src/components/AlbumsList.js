import { useFetchAlbumsQuery, useAddAlbumMutation } from './../store';
import Skeleton from './Skeleton';
import ExpandablePanel from './ExpandablePanel';
import Button from './Button';

function AlbumsList({ user }) {
  // this will fetch all albums for a user. (rtkq)
  const { data, error, isLoading } = useFetchAlbumsQuery(user);
  const [addAlbum, results] = useAddAlbumMutation();
  console.log(results);

  const handleAddAlbum = () => {
    addAlbum(user);
  };

  let content;
  if (isLoading) content = <Skeleton howMany={2} />;
  else if (error) content = <div>Error loading albums</div>;
  else if (data) {
    content = data.map(album => {
      return (
        <>
          <ExpandablePanel key={album.id} header={<div>{album.title}</div>}>
            Photos go here!
          </ExpandablePanel>
        </>
      );
    });
  }

  console.log(data, error, isLoading);
  return (
    <>
      <div>
        Albums for {user.name}{' '}
        <Button onClick={handleAddAlbum}>+ Add Album</Button>
      </div>
      <div>{content}</div>
    </>
  );
}

export default AlbumsList;

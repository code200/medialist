import { GoTrash } from 'react-icons/go';
import Button from './Button';
import ExpandablePanel from './ExpandablePanel';
import { useRemoveAlbumMutation } from '../store';
import PhotosList from './PhotosList';

function AlbumsListItem({ album }) {
  const [removeAlbum, results] = useRemoveAlbumMutation();

  const handleDeleteAlbum = () => {
    removeAlbum(album); // the param here will become the 3rd arg in the invalidate tag
  };

  const header = (
    <>
      <Button
        className="mr-2"
        loading={results.isLoading}
        onClick={handleDeleteAlbum}
      >
        <GoTrash />
      </Button>
      {album.title}
    </>
  );

  return (
    <>
      <ExpandablePanel key={album.id} header={header}>
        <PhotosList album={album} />
      </ExpandablePanel>
    </>
  );
}

export default AlbumsListItem;

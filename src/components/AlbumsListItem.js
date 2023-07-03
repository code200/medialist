import { GoTrash } from 'react-icons/go';
import Button from './Button';
import ExpandablePanel from './ExpandablePanel';
import { useRemoveAlbumMutation } from '../store';

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
        Photos go here!
      </ExpandablePanel>
    </>
  );
}

export default AlbumsListItem;

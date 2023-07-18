import { GoTrash } from 'react-icons/go';
import { useRemovePhotoMutation } from './../store';

function PhotosListItem({ photo }) {
  const [removePhoto /*, results*/] = useRemovePhotoMutation();

  const handleRemovePhoto = () => {
    removePhoto(photo);
  };

  return (
    <div className="relative m-2 cursor-pointer">
      <img
        className="h-20 w-20"
        src={photo.url}
        alt="random pic"
        width="150px"
        height="150px"
      />
      <div className="absolute inset-0 flex item-center justify-center hover:bg-gray-200 opacity-0 hover:opacity-80">
        <GoTrash className="text-3xl" onClick={handleRemovePhoto} />
      </div>
    </div>
  );
}

export default PhotosListItem;

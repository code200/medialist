import PhotosListItem from './PhotosListItem';
import { useFetchPhotosQuery, useAddPhotoMutation } from './../store';
import Button from './Button';
import Skeleton from './Skeleton';

function PhotosList({ album }) {
  const { data, error, isFetching } = useFetchPhotosQuery(album);
  const [addPhoto, addPhotoResults] = useAddPhotoMutation();

  const handlePhotoAdd = () => {
    addPhoto(album); // invoke mutation with album for endpoint.
  };

  let content;
  if (isFetching) {
    content = <Skeleton className="h-10 w-full" howMany={2} />;
  } else if (error) {
    content = `Error Fetching Photos: ${error.message}`;
  } else if (data) {
    content = data.map(photo => {
      return <PhotosListItem key={photo.id} photo={photo} />;
    });
  }

  return (
    <div>
      <div className="m-2 flex flex-row items-center justify-between">
        <h3 className="text-lg font-bold">Photos in {album.title}</h3>
        <Button loading={addPhotoResults.isLoading} onClick={handlePhotoAdd}>
          + Add Photo
        </Button>
      </div>
      <div className="m-8 flex flex-row flex-wrap justify-center">
        {content}
      </div>
    </div>
  );
}

export default PhotosList;

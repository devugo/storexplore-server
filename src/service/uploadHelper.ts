import cloudinaryV2 from '../cloudinary.config';
import { throwError } from '../helper/throw-error';

export const uploadHelper = async (path: string) => {
  const upload = await cloudinaryV2.uploader
    .upload(path, {
      tags: 'storexplore',
      folder: 'storexplore',
    })
    .then(function (image) {
      return image.url;
    })
    .catch(function (err) {
      const error = throwError(err, err.message);
      return error;
    });

  return upload;
};
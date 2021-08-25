import cloudinaryV2 from '../cloudinary.config';

export const uploadHelper = async (path: string) => {
  try {
    const upload = await cloudinaryV2.uploader
      .upload(path, {
        tags: 'storexplore',
        folder: 'storexplore',
      })
      .then(function (image) {
        return image.url;
      })
      .catch(function (err) {
        throw err;
      });

    return upload;
  } catch (error) {
    throw error;
  }
};

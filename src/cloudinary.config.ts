import * as cloudinary from 'cloudinary';
import { API_KEY, API_SECRET, CLOUD_NAME } from './config';

const cloudinaryV2 = cloudinary.v2;

cloudinaryV2.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
});

export default cloudinaryV2;

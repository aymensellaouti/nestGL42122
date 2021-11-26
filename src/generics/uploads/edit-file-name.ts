import { v4 as uuidv4 } from 'uuid';
export const editFileName = (req, file, cb) => {
  const randomName = uuidv4() + file.originalname;
  cb(null, randomName);
};

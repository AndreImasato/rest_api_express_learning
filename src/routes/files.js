import { Router } from 'express';

import middleware from '../middlewares';
//import uploadFile from '../utils/uploadFiles';


const { authJwtMiddleware, uploadMiddleware } = middleware;

const router = Router();

router.post(
  '/',
  uploadMiddleware.upload.single('photo'),
  async (req, res) => {
    console.log(req.photo)
    console.log(req.file)
    console.log(req.files)
    
    //!const file = req.files[0]
    //!console.log(file)
    /* uploadFile(file, file.fileName)
      .then(() => {
        return res.status(200).json({ message: "OK" });
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).json({ error: err })
      }) */

    /* Promise.all(req.files.map(async file => {
      uploadFile(file, file.fileName)
        .then(() => {
          return Promise.resolve();
        })
        .catch((err) => {
          console.error(err);
          return Promise.reject(err);
        })
    }))
      .then(() => {
        return res
          .status(200)
          .json({ message: 'Successfully uploaded!' });
      })
      .catch((err) => {
        return res
          .status(500)
          .json({ error: err });
      }); */
  }
)

export default router;
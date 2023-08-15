import { Router } from 'express';

import middleware from '../middlewares';
import uploadFile from '../utils/uploadFiles';
import downloadFile from '../utils/downloadFile';


const { authJwtMiddleware, uploadMiddleware } = middleware;

const router = Router();

router.post(
  '/',
  [authJwtMiddleware.verifyToken, uploadMiddleware.upload.single('photo')],
  async (req, res) => {
    uploadFile(req.file.path, req.file.originalname)
      .then((data) => {
        return res
          .status(200)
          .json({ fileName: data })
      })
      .catch((err) => {
        return res
          .status(500)
          .json({ err: err })
      });
  }
)

router.get(
  '/:fileName',
  [authJwtMiddleware.verifyToken],
  async (req, res) => {
    downloadFile(req.params.fileName)
    .then((data) => {
      return res
        .status(200)
        .send(data)
    })
    .catch((err) => {
      return res
        .status(500)
        .json({ error: err })
    });
  }
)


export default router;
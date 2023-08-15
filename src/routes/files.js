import { Router } from 'express';

import middleware from '../middlewares';
import uploadFile from '../utils/uploadFiles';


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

export default router;
// Import custom middlewares here
import authJwtMiddleware from './authJwt';
import uploadMiddleware from './uploader'

const middlewares = {
  // "list" middlewares here
  authJwtMiddleware,
  uploadMiddleware
}

export default middlewares;
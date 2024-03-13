import express from 'express'
import {deleteAll, deleteImages, deleteLike, deleteMessage, deleteUsers} from "./deleted.controller.js";
import {errorHandler} from "../middleware/errorMiddleware.js";

const router = express.Router()

router.route('/deleteUsers').delete(deleteUsers)
router.route('/deleteImages').delete(deleteImages)
router.route('/deleteLikes').delete(deleteLike)
router.route('/deleteMessages').delete(deleteMessage)
router.route('/deleteAll').delete(deleteAll)

router.use(errorHandler);


export default router
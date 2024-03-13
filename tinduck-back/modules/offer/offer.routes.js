import express from 'express'
import {checkToken} from "../middleware/checkToken.js";
import {getLikedBy, getOfferUser, likeOffer} from "./offer.controller.js";
import {errorHandler} from "../middleware/errorMiddleware.js";

const router = express.Router()

router.route('/').post(checkToken, getOfferUser)
router.route('/like/:id').post(checkToken, likeOffer)
router.route('/like').get(checkToken, getLikedBy)

router.use(errorHandler);

export default router
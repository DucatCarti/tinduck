import express from 'express'
import {editProfile, getProfile, loginUser, registerCheckEmail, registerUser} from "./auth.controller.js";
import {checkToken} from "../middleware/checkToken.js";
import {errorHandler} from "../middleware/errorMiddleware.js";

const router = express.Router()

router.route('/login').post(loginUser)
router.route('/register').post(registerUser)
router.route('/register/email').post(registerCheckEmail)
router.route('/profile').get(checkToken, getProfile)
router.route('/profile/edit').post(checkToken, editProfile)

router.use(errorHandler);

export default router
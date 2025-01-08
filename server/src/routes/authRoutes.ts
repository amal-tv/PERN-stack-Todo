import  express  from "express";
import {login} from "../controllers/authController"
import {signup} from "../controllers/authController"

const router = express.Router();


router.post("/login",login);
router.post("/signup",signup);

export default router;


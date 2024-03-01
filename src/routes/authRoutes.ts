import {Router, RouterOpcions} from "express";
import { authController } from "../controllers/authController";
class AuthRoutes{
    //objecto tipo router
    public router: Router;

    //inicializar constructor
    constructor(){
        this.router = Router();
        this.config();

    }

    config(){
        this.router.post('/',authController.iniciarSesion);
        };
    }
const authRoutes = new AuthRoutes();
export default authRoutes.router;
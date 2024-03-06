import {Router} from "express";
import { authController } from "../controllers/authController";
import { usuarioController } from "../controllers/usuarioController";

class UsuarioRoutes {


    public router: Router;


    constructor() {
        this.router = Router();
        this.config();
    }


    private config() {
        this.router.get('/', usuarioController.list);        
        this.router.post('/', usuarioController.add)
        this.router.put('/', usuarioController.update)
        this.router.delete('/', usuarioController.delete)
    }
}
const usuarioRoutes = new UsuarioRoutes();
export default usuarioRoutes.router;

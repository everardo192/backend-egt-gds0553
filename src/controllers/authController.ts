import { Request, Response } from "express";
import validator from "validator";
import model from '../models/authModelo';

class AuthController {
    public async iniciarSesion(req: Request, res: Response) {
       
        try {
            const {email, password }= req.body;
            const lstUsers = await model.getuserByEmail(email);     
            // verificar que los datos no esten vacios
            if (lstUsers.length <= 0) {
            return res
                .status(400)
                .json({ message: "Los campos son requeridos", code: 1 });
            }
     
            return res.json({ message : "Autenticación correcta", code: 0 });
     
        } catch (error: any) {
            return res.status(500).json({ message : `${error.message}` });
        }
    }

}
export const authController = new AuthController();
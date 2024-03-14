import { Request, Response } from "express";
import validator from "validator";
import model from "../models/usuarioModelo";
import { utils } from "../utils/utils";

class UsuarioController {

  public async list(req: Request, res: Response) {
    try {
        const users = await model.list();
        return res.json({ message: "Listado de Usuario", code: 0, users });
    } catch (error: any) {
        return res.status(500).json({ message: `${error.message}` });
    }
  }

  public async add(req: Request, res: Response) {
    try {
      // Extraer los datos del cuerpo de la solicitud
      const { email, password, role } = req.body;

      // Verificar que los campos no estén vacíos
      if (!email || !password || !role) {
        return res.status(400).json({ message: "Todos los campos son requeridos", code: 400 });
      }

      // Verificar que el email sea válido
      if (!validator.isEmail(email)) {
        return res.status(400).json({ message: "Email inválido", code: 400 });
      }

      // Verificar si ya existe un usuario con ese email
      const existingUser = await model.listByEmail(email);
      if (existingUser.length > 0) {
        return res.status(400).json({ message: "Ya existe un usuario con ese email", code: 400 });
      }

      // Encriptar la contraseña
      const encryptedPassword = await utils.hashPassword(password);

      // Crear el usuario
      const user = { email, password: encryptedPassword, role };
      await model.add(user);

      return res.json({ message: "Se agregó el usuario correctamente", code: 0 });

    } catch (error: any) {
      return res.status(500).json({ message: `${error.message}` });
    }
  }

  public async update(req: Request, res: Response) {
    try {
      // Extraer los datos del cuerpo de la solicitud
      const { email, password, role } = req.body;

      // Verificar que los campos no estén vacíos
      if (!email || !password || !role) {
        return res.status(400).json({ message: "Todos los campos son requeridos", code: 400 });
      }

      // Verificar si el usuario existe
      const existingUser = await model.listByEmail(email);
      if (existingUser.length === 0) {
        return res.status(404).json({ message: "Usuario no encontrado", code: 404 });
      }

      // Encriptar la contraseña
      const encryptedPassword = await utils.hashPassword(password);

      // Actualizar la contraseña del usuario
      const updatedUser = { email, password: encryptedPassword, role };
      await model.update(updatedUser);

      return res.json({ message: "Se modificó el usuario correctamente", code: 0 });

    } catch (error: any) {
      return res.status(500).json({ message: `${error.message}` });
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const { email } = req.body;

      // Verificar si el usuario existe
      const existingUser = await model.listByEmail(email);
      if (existingUser.length === 0) {
        return res.status(404).json({ message: "Usuario no encontrado", code: 404 });
      }

      // Eliminar el usuario
      await model.delete(email);

      return res.json({ message: "Eliminación de Usuario", code: 0 });
    } catch (error: any) {
      return res.status(500).json({ message: `${error.message}` });
    }
  }
}

export const usuarioController = new UsuarioController();
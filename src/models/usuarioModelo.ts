import pool from '../config/connection';

class UsuarioModelo {

    public async list() {
        const result = await pool.database.then(async (connection) => {
            return await connection.query("SELECT u.email, u.password, u.role FROM tbl_usuario u");
        });
        return result;
    }

    public async listByEmail(email: string) {
        const result = await pool.database.then(async (connection) => {
            return await connection.query("SELECT u.email, u.password, u.role FROM tbl_usuario u WHERE u.email = ?", [email]);
        });
        return result;
    }

    public async add(usuario: any) {
        // Verificar si el usuario ya existe
        const existingUser = await this.listByEmail(usuario.email);
        if (existingUser.length > 0) {
            throw new Error('El usuario ya está registrado');
        }

        // Si el usuario no existe, proceder con la inserción
        const result = await pool.database.then(async (connection) => {
            return await connection.query("INSERT INTO tbl_usuario SET ?", [usuario]);
        });
        return result;
    }

    public async update(usuario: any) {
        // Verificar si el usuario existe
        const existingUser = await this.listByEmail(usuario.email);
        if (existingUser.length === 0) {
            throw new Error('El usuario no existe');
        }

        // Si el usuario existe, proceder con la actualización
        const updateQuery = "UPDATE tbl_usuario SET password = ? WHERE email = ?";
        const result = await pool.database.then(async (connection) => {
            return await connection.query(updateQuery, [usuario.password, usuario.email]);
        });
        return result;
    }

    public async delete(email: string) {
        // Verificar si el usuario existe
        const existingUser = await this.listByEmail(email);
        if (existingUser.length === 0) {
            throw new Error('El usuario no existe');
        }

        // Si el usuario existe, proceder con la eliminación
        const result = await pool.database.then(async (connection) => {
            return await connection.query("DELETE FROM tbl_usuario WHERE email = ?", [email]);
        });
        return result;
    }
}

const model = new UsuarioModelo();
export default model;
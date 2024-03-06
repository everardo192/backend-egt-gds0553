import mysql from 'promise-mysql';

const pool = mysql.createPool({
    host: 'localhost',
    port: 3307, /*Se Cambio el puerto porque worbench ocupa ese puerto*/
    user: 'root',
    password: '12345678',
    database: 'apliweb'
});
export default pool;

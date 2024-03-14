import mysql from 'promise-mysql';


const pool = mysql.createPool({
    host: 'localhost',
    port: 3307,
    user: 'root',
    password: '12345678',
    database: 'apliweb'
});
export default {
    keys: {
        secret:')(/&%$webintegral$#&/%'
    },
    database: pool
};

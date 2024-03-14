"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_mysql_1 = __importDefault(require("promise-mysql"));
const pool = promise_mysql_1.default.createPool({
    host: 'localhost',
    port: 3307,
    user: 'root',
    password: '12345678',
    database: 'apliweb'
});
exports.default = {
    keys: {
        secret: ')(/&%$webintegral$#&/%'
    },
    database: pool
};
//# sourceMappingURL=connection.js.map
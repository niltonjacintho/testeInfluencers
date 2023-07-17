"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const main_router_1 = __importDefault(require("./routes/main.router"));
const swagger_1 = __importDefault(require("./utils/swagger"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const logger_1 = __importDefault(require("./utils/logger"));
const typeorm_1 = require("typeorm");
// import {} from "./entities/"
const cors = require('cors');
const port = Number(process.env.PORT) || 8000;
const app = (0, express_1.default)();
const connection = (0, typeorm_1.createConnection)({
    type: "postgres",
    host: "localhost",
    port: 5433,
    username: "postgres",
    password: "postgres",
    database: "teste",
    logging: true,
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
});
app.use(express_1.default.json());
app.use(cors({ origin: '*' }));
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info(`App is running at <<<<< http://localhost:${port} >>>>>>`);
    (0, main_router_1.default)(app);
    (0, swagger_1.default)(app, port);
}));
function cors1(arg0) {
    throw new Error("Function not implemented." + arg0);
}

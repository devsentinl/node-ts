"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const index_routes_1 = __importDefault(require("./routes/index.routes"));
const course_routes_1 = __importDefault(require("./routes/course.routes"));
const student_routes_1 = __importDefault(require("./routes/student.routes"));
const mongoose_1 = __importDefault(require("mongoose"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
class Server {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    config() {
        const MONGO_URI = 'mongodb://localhost/restapi';
        mongoose_1.default.set('useFindAndModify', true);
        mongoose_1.default.connect(MONGO_URI, {
            useNewUrlParser: true,
            useCreateIndex: true
        }).then(db => console.log('db is connected'));
        this.app.set('port', process.env.PORT || 3000);
        //middlewares
        this.app.use(morgan_1.default('dev'));
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use(helmet_1.default());
        this.app.use(compression_1.default());
        this.app.use(cors_1.default());
    }
    routes() {
        this.app.use(index_routes_1.default);
        this.app.use('/rest', course_routes_1.default);
        this.app.use('/rest', student_routes_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('server running');
        });
    }
}
const server = new Server();
server.start();

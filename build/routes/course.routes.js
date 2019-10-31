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
const express_1 = require("express");
const Course_1 = __importDefault(require("../models/Course"));
class CourseRoutes {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    courseList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const courses = yield Course_1.default.find();
            res.json(courses);
        });
    }
    createCourse(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, url, content } = req.body;
            const newCourse = new Course_1.default({ name, url, content });
            yield newCourse.save();
            res.json(newCourse);
        });
    }
    updateCourse(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name } = req.params;
            const course = yield Course_1.default.findOneAndUpdate({ name }, req.body);
            res.json(course);
        });
    }
    deleteCourse(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name } = req.params;
            yield Course_1.default.findOneAndDelete({ name });
            res.json({ response: "course deleted successfully" });
        });
    }
    routes() {
        this.router.get('/course/list', this.courseList);
        this.router.post('/course/create', this.createCourse);
        this.router.put('/course/:name', this.updateCourse);
        this.router.delete('/course/:name', this.deleteCourse);
    }
}
const courseRoutes = new CourseRoutes();
exports.default = courseRoutes.router;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CourseSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    url: { type: String, required: true, unique: true, lowercase: true },
    content: { type: String, required: true },
    image: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
    students: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'student'
        }]
});
exports.default = mongoose_1.model('course', CourseSchema);

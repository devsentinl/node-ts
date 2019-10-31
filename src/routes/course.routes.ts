import {Request,Response,Router} from 'express'
import Course from '../models/Course'
import { request } from 'http'
class CourseRoutes{
    router:Router
    constructor(){
        this.router=Router()
        this.routes()
    }
    async courseList(req:Request,res:Response){
        const courses=await Course.find()
        res.json(courses)
    }
    async createCourse(req:Request,res:Response){
        const {name,url,content}=req.body
        const newCourse=new Course({name,url,content})
        await newCourse.save()
        res.json(newCourse)
    }
    async updateCourse(req:Request,res:Response){
        const {name}=req.params
        const course=await Course.findOneAndUpdate({name},req.body)
        res.json(course)
    }
    async deleteCourse(req:Request,res:Response){
        const {name}=req.params
        await Course.findOneAndDelete({name})
        res.json({response:"course deleted successfully"})
    }
    routes(){
        this.router.get('/course/list',this.courseList)
        this.router.post('/course/create',this.createCourse)
        this.router.put('/course/:name',this.updateCourse)
        this.router.delete('/course/:name',this.deleteCourse)
    }
}

const courseRoutes=new CourseRoutes()
export default courseRoutes.router

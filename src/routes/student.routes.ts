import {Request,Response,Router} from 'express'
import Student from '../models/Student'
class StudentRoutes{
    router:Router
    constructor(){
        this.router=Router()
        this.routes()
    }
    async studentList(req:Request,res:Response){
        const students=await Student.find()
        res.json(students)
    }
    async studentCreate(req:Request,res:Response){
        const {firstname,lastname,phone,email}=req.body
        const newStudent=new Student({firstname,lastname,phone,email})
        await newStudent.save()
        res.json(newStudent)
    }
    routes(){
        this.router.get('/student/list',this.studentList)
        this.router.post('/student/create',this.studentCreate)
    }
}
const studentRoutes=new StudentRoutes()
export default studentRoutes.router
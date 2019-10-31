import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import indexRoutes from './routes/index.routes'
import courseRoutes from './routes/course.routes'
import studentRoutes from './routes/student.routes'
import mongoose from 'mongoose'
import compression from 'compression'
import cors from 'cors'
class Server{
    public app:express.Application
    constructor(){
        this.app=express()
        this.config()
        this.routes()
    }
    config(){
        const MONGO_URI='mongodb://localhost/restapi'
        mongoose.set('useFindAndModify',true)
        mongoose.connect(MONGO_URI,{
            useNewUrlParser:true,
            useCreateIndex:true
        }).then(db=>console.log('db is connected'))
        this.app.set('port',process.env.PORT||3000)
        //middlewares
        this.app.use(morgan('dev'))
        this.app.use(express.json()) 
        this.app.use(express.urlencoded({extended:false}))       
        this.app.use(helmet())
        this.app.use(compression())
        this.app.use(cors())
    }
    routes(){
        this.app.use(indexRoutes)
        this.app.use('/rest',courseRoutes)
        this.app.use('/rest',studentRoutes)
    }
    start(){
        this.app.listen(this.app.get('port'),()=>{
            console.log('server running')
        })
    }
}
const server=new Server()
server.start()
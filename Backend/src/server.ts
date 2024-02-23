import express, { Request, Response, json } from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.Routes';

dotenv.config();

const app = express()

app.use(json());

// app.use((error: Error, req: Request, res: Response)=>{
//     res.status(500).json({
//         error
//     })
// })

// Import the routes
app.use('/auth', authRoutes)

const PORT = process.env.PORT

app.listen(PORT, ()=>{
    console.log("App is listening on ", PORT);
    
})
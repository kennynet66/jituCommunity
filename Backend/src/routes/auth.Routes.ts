import { Router } from "express";
import { deleteUser, getAllUsers, getUser, registerUser, updateUser } from "../controllers/auth.Controller";

const authRoutes = Router();

authRoutes.post('/register', registerUser);
authRoutes.get('/user/:id', getUser);
authRoutes.get('/user', getAllUsers);
authRoutes.delete('/delete/:id', deleteUser);
authRoutes.put('/update/:id', updateUser);


export default authRoutes
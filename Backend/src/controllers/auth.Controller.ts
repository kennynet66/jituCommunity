import { Request, Response } from "express";
import mssql from 'mssql'
import bcrypt from 'bcrypt';
import { v4 } from 'uuid';
import validator from 'validator'
import { sqlConfig } from "../config/sqlConfig";

// Verify email
function verifyEmail(email: string) {
    if (validator.isEmail(email)) {
        // Check if the email matches the template
        const parts = email.split('@');
        if (parts.length === 2 && parts[1] === 'thejitu.com') {
            const namePart = parts[0];
            const nameParts = namePart.split('.');
            if (nameParts.length === 2 && nameParts[0].length > 0 && nameParts[1].length > 0) {
                return true;
            }
        }
    }
}

export const registerUser = (async (req: Request, res: Response) => {
    try {
        // Get the req.body
        const { full_name, email, cohort_no, password } = req.body

        if (verifyEmail(email)) {
            const hash_pwd = await bcrypt.hash(password, 5);
            const pool = await mssql.connect(sqlConfig)

            const id = v4();

            let result = (await pool.request()
                .input("id", mssql.VarChar, id)
                .input("full_name", mssql.VarChar, full_name)
                .input("email", mssql.VarChar, email)
                .input("cohort_no", mssql.Int, cohort_no)
                .input("password", mssql.VarChar, hash_pwd)
                .execute('registerUser')
            )
            res.status(200).json({
                success: "User registered successfully"
            })
        } else {
            return res.status(201).json({
                error: "Invalid email format"
            })
        }
    } catch (error) {
        res.status(500).json({
            error
        })
    }
})

// Get one user
export const getUser = (async (req: Request, res: Response) => {
    try {
        const pool = await mssql.connect(sqlConfig);

        if (pool.connected) {
            const id = req.params.id
            const user = (await pool.request()
                .input('id', mssql.VarChar, id)
                .query('SELECT * FROM Users WHERE id = @id')
            ).recordset;
            if (user.length > 0) {
                res.status(200).json({
                    user
                })
            } else {
                res.status(201).json({
                    error: "Could not find user"
                })
            }
        } else {
            res.status(500).json({
                error: "Could not create pool connection"
            })
        }
    } catch (error) {
        res.status(500).json({
            error
        })
    }
})

// Delete a user
export const deleteUser = (async (req: Request, res: Response) => {
    try {
        const pool = await mssql.connect(sqlConfig);

        if (pool.connected) {
            const id = req.params.id
            const user = (await pool.request()
                .input("id", mssql.VarChar, id)
                .query('DELETE FROM Users WHERE id = @id')
            ).rowsAffected
            if (user[0] > 0) {
                res.status(200).json({
                    success: "User successfully deleted"
                })
            } else {
                res.status(201).json({
                    error: "Could not delete user"
                })
            }
        } else {
            res.status(500).json({
                error: "Could not create pool connection"
            })
        }
    } catch (error) {
        res.status(500).json({
            error
        })
    }
})

// Update user details
export const updateUser = (async (req: Request, res: Response) => {
    try {
        // Get the req.body
        const { full_name, email, cohort_no, password } = req.body

        const hash_pwd = await bcrypt.hash(password, 5);
        if (verifyEmail(email)) {
            const pool = await mssql.connect(sqlConfig)

            const id = req.params.id;

            let result = (await pool.request()
                .input("id", mssql.VarChar, id)
                .input("full_name", mssql.VarChar, full_name)
                .input("email", mssql.VarChar, email)
                .input("cohort_no", mssql.Int, cohort_no)
                .input("password", mssql.VarChar, hash_pwd)
                .execute('updateUser')
            ).rowsAffected

            if (result[0] > 0) { }
            res.status(200).json({
                success: "User updated successfully"
            })
        } else {
            return res.status(201).json({
                error: "Invalid email format"
            })
        }
    } catch (error) {
        res.status(500).json({
            error
        })
    }
})

// Get all users
export const getAllUsers = (async (req: Request, res: Response) => {
    try {
        const pool = await mssql.connect(sqlConfig);

        if (pool.connected) {
            let users = (await (pool.request().query(`SELECT * FROM Users`))).recordset;

            if (users.length > 0) {
                res.status(200).json({
                    users
                })
            } else {
                res.status(201).json({
                    error: "No users available"
                })
            }
        } else {
            res.status(500).json({
                error: "Could not create pool connection"
            })
        }
    } catch (error) {
        res.status(500).json({
            error
        })
    }
})
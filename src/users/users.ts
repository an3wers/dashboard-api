import express, { Router } from "express";

export const userRouter = Router()

// Локальный промежуточный обработчик
userRouter.use((req, res, next) => {
    console.log('Обработчик users')
    next()
})

userRouter.post('/login', (req, res) => {
    res.send('login')
})

userRouter.post('/register', (req, res) => {
    res.send('register')
})
// Создаем простой сервер через библиотеку express

import express, { Request, Response, NextFunction } from 'express';
import { userRouter } from './users/users.back.js';

const port = 8000;

const app = express();

app.use((req, res, next) => {
	console.log('Время: ', Date.now());
	next();
});

app.get('/hello', (req, res) => {
	res.cookie('token', 'jhjh8298jdhsf', {
		domain: '',
		path: '/',
		secure: true,
	});
	res.type('json');
	//   res.send({ success: true });
	throw new Error('error');
});

// Обрабатываем роутер userRouter
app.use('/users', userRouter);

// Обработка ошибки
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
	console.log(error.message);
	res.status(500).send(error.message);
});

app.listen(port, () => {
	console.log(`Сервер запушен: http://localhost:${port}`);
});

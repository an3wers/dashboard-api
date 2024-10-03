import { boot } from '../src';
import { App } from '../src/app';
import request from 'supertest';

let application: App;

beforeAll(async () => {
	const { app } = await boot;
	application = app;
});

/*
{
    "email": "test@test.ru",
    "name": "Test test",
    "password": "123"
}
*/

describe('User e2e', () => {
	it('Register error', async () => {
		const result = await request(application.app)
			.post('/users/register')
			.send({ email: 'test@test.ru', password: '123', name: 'Test test' });
		expect(result.status).toBe(400);
	});
});

afterAll(() => {
	application.close();
});

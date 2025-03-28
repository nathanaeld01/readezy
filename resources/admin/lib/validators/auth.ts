import { z } from 'zod';

const loginValidator = z.object({
	email: z
		.string()
		.nonempty('Email is required')
		.email('Please enter a valid email address')
		.trim(),
	password: z.string().nonempty('Password is required').trim(),
	remember: z.boolean(),
});

type Login = z.infer<typeof loginValidator>;

export { loginValidator };
export type { Login };

import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';

const login = z.object({
	email: z.string().email({ message: 'Invalid email address' }),
	password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
	remember: z.boolean().default(false).optional(),
});

const createAuthor = z.object({
	image: z.instanceof(File, { message: 'Author image is required' }),
	name: z
		.string({ required_error: 'Author name is required' })
		.min(2, 'Name must be at least 2 characters')
		.max(50, 'Name must not exceed 50 characters'),
	description: z
		.string({ required_error: 'Author description is required' })
		.min(10, 'Description must be at least 10 characters')
		.max(1000, 'Description must not exceed 1000 characters'),
});

const createSeries = z.object({
	title: z.string({ required_error: 'Series title is required' }).min(1),
	author: z.string({ required_error: 'Author is required' }).min(1),
});

const loginSchema = toTypedSchema(login);
const createAuthorSchema = toTypedSchema(createAuthor);
const createSeriesSchema = toTypedSchema(createSeries);

type Login = z.infer<typeof login>;
type CreateAuthor = z.infer<typeof createAuthor>;
type CreateSeries = z.infer<typeof createSeries>;

export { createAuthorSchema, createSeriesSchema, loginSchema };
export type { CreateAuthor, CreateSeries, Login };

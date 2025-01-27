import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';

const login = z.object({
	email: z.string().email({ message: 'Invalid email address' }),
	password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
	remember: z.boolean().default(false).optional(),
});

const createAuthor = z.object({
	image_url: z.object(
		{
			url: z.string(),
			name: z.string(),
			size: z.string(),
		},
		{
			required_error: 'Author image is required',
			invalid_type_error: 'Author image must be a file',
		},
	),
	name: z
		.string({ required_error: 'Author name is required' })
		.min(1, { message: 'Author name must be at least 1 character.' }),
	description: z
		.string({ required_error: 'Author description is required' })
		.min(75, { message: 'Author description must be at least 75 characters.' })
		.max(500, { message: 'Author description must be at most 500 characters.' }),
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

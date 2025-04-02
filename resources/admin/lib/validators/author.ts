import z from 'zod';

const dateSchema = ({
	past_error = 'Must be in the past',
	required_error = 'Date is required',
}: {
	past_error: string;
	required_error?: string;
}) =>
	z
		.string({ required_error })
		.date('Must be a valid date (YYYY-MM-DD)')
		.refine(date => new Date(date) < new Date(), past_error);

const authorValidator = z.object({
	date_of_birth: dateSchema({
		past_error: 'Date of birth must be in the past',
		required_error: 'Date of birth is required',
	}),

	date_of_death: dateSchema({
		past_error: 'Date of death must be in the past',
	}).optional(),

	description: z
		.string({
			invalid_type_error: 'Description must be a string',
		})
		.min(1, 'Description must not be empty'), // Matches array min:1 after splitting

	image: z
		.instanceof(File, { message: 'Please upload a valid image file.' })
		.refine(
			file => ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type),
			'Only JPG, JPEG, PNG, and WEBP formats are supported.',
		),

	nationality: z
		.string({
			invalid_type_error: 'Nationality must be a string',
		})
		.max(100, 'Nationality can have max 100 characters')
		.trim(),

	title: z
		.string({
			invalid_type_error: 'Title must be a string',
		})
		.min(3, 'Title must be at least 3 characters long')
		.max(255, 'Title must be at most 255 characters long')
		.trim(),

	website_url: z
		.string({
			invalid_type_error: 'Website URL must be a string',
		})
		.max(255, 'Website URL can have max 255 characters')
		.trim()
		.url('Must be a valid URL')
		.optional()
		.or(z.literal('')),
});

const createAuthorValidator = authorValidator.refine(
	({ date_of_birth, date_of_death }) => !date_of_death || date_of_death > date_of_birth,
	{
		message: 'Death date must be after birth date',
		path: ['date_of_death'],
	},
);

// Edit validator with date relationship check
const editAuthorValidator = authorValidator
	.partial()
	.refine(
		({ date_of_birth, date_of_death }) =>
			!date_of_birth || !date_of_death || date_of_death > date_of_birth,
		{
			message: 'Death date must be after birth date',
			path: ['date_of_death'],
		},
	);

const deleteAuthorValidator = z.object({
	slugs: z.array(z.string()).optional(),
});

type CreateAuthor = z.infer<typeof createAuthorValidator>;
type DeleteAuthor = z.infer<typeof deleteAuthorValidator>;
type EditAuthor = z.infer<typeof editAuthorValidator>;

export { createAuthorValidator, deleteAuthorValidator, editAuthorValidator };
export type { CreateAuthor, DeleteAuthor, EditAuthor };

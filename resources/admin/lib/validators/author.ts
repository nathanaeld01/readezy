import z from 'zod';

const createAuthorValidator = z
	.object({
		date_of_birth: z
			.string({
				invalid_type_error: 'Birth date must be a string',
				required_error: 'Birth date required',
			})
			.date('Must be a valid date (YYYY-MM-DD)')
			.trim(),
		date_of_death: z
			.string({
				invalid_type_error: 'Death date must be a string',
			})
			.date('Must be a valid date (YYYY-MM-DD)')
			.trim()
			.optional(),
		description: z
			.string({
				invalid_type_error: 'Author description must be a string',
				required_error: 'Author description is required',
			})
			.min(10, 'Description must be at least 10 characters')
			.max(500, 'Description must not exceed 500 characters')
			.trim(),
		image: z
			.instanceof(File, { message: 'Please upload a valid image file.' })
			.refine(
				file => ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type),
				'Only JPG, JPEG, PNG, and WEBP formats are supported.',
			),

		nationality: z
			.string({
				invalid_type_error: 'Nationality must be a string',
				required_error: 'Nationality required',
			})
			.max(100, 'Nationality can have max 100 characters')
			.trim(),

		title: z
			.string({
				invalid_type_error: 'Title must be a string',
				required_error: 'Title is required',
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
	})
	.superRefine((data, ctx) => {
		const dob = new Date(data.date_of_birth);
		const dod = data.date_of_death ? new Date(data.date_of_death) : null;
		const today = new Date();

		if (dob >= today) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Must be in the past',
				path: ['date_of_birth'],
			});
		}

		if (dod && (dod <= dob || dod >= today)) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: dod <= dob ? 'Must be after date of birth' : 'Must be in the past',
				path: ['date_of_death'],
			});
		}
	});

const deleteAuthorValidator = z.object({
	slugs: z.array(z.string()).optional(),
});

type CreateAuthor = z.infer<typeof createAuthorValidator>;
type DeleteAuthor = z.infer<typeof deleteAuthorValidator>;

export { createAuthorValidator, deleteAuthorValidator };
export type { CreateAuthor, DeleteAuthor };

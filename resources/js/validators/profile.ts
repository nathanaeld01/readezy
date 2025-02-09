import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';

const updateInformation = z.object({
	avatar: z.instanceof(File).nullable(),
	name: z.string({ required_error: 'Name is required' }).min(1),
	email: z.string({ required_error: 'Email is required' }).email({ message: 'Invalid email address' }),
});

const updatePassword = z
	.object({
		current_password: z
			.string({ required_error: 'Current password is required' })
			.min(6, 'Password must be at least 6 characters'),
		new_password: z
			.string({ required_error: 'Password is required' })
			.min(6, 'Password must be at least 6 characters'),
		confirm_password: z
			.string({ required_error: 'Password confirmation is required' })
			.min(6, 'Password must be at least 6 characters'),
	})
	.superRefine(({ confirm_password, new_password }, ctx) => {
		if (confirm_password !== new_password) {
			ctx.addIssue({
				code: 'custom',
				message: 'The passwords did not match',
				path: ['confirmPassword'],
			});
		}
	});

const deleteAccount = z.object({
	password: z.string({ required_error: 'Password is required' }).min(6, 'Password must be at least 6 characters'),
});

const logoutSessions = z.object({
	password: z.string({ required_error: 'Password is required' }).min(6, 'Password must be at least 6 characters'),
});

const updateInformationSchema = toTypedSchema(updateInformation);
const updatePasswordSchema = toTypedSchema(updatePassword);
const deleteAccountSchema = toTypedSchema(deleteAccount);
const logoutSessionsSchema = toTypedSchema(logoutSessions);

type UpdateInformation = z.infer<typeof updateInformation>;
type UpdatePassword = z.infer<typeof updatePassword>;
type DeleteAccount = z.infer<typeof deleteAccount>;
type LogoutSessions = z.infer<typeof logoutSessions>;

export { deleteAccountSchema, logoutSessionsSchema, updateInformationSchema, updatePasswordSchema };
export type { DeleteAccount, LogoutSessions, UpdateInformation, UpdatePassword };

import { useForm } from '@tanstack/react-form';
import { router } from '@inertiajs/react';

import { type Login, loginValidator } from '@/admin/lib/validators/auth';
import { Label } from '../../ui/label';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { Checkbox } from '../../ui/checkbox';

export const LoginForm = () => {
	const { handleSubmit, Field, Subscribe } = useForm({
		defaultValues: {
			email: '',
			password: '',
			remember: false,
		} as Login,
		validators: {
			onSubmit: loginValidator,
		},
		onSubmit: ({ value }) => router.post(route('admin.login'), value),
	});

	const submitHandler = async (e: React.FormEvent) => {
		e.preventDefault();
		e.stopPropagation();
		await handleSubmit();
	};

	return (
		<div className="m-auto h-fit w-full max-w-sm space-y-8">
			<h1 className="text-center text-3xl font-semibold">Login</h1>
			<form className="space-y-4" onSubmit={submitHandler} noValidate>
				<Field name="email">
					{({ state, handleChange }) => (
						<div className="space-y-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								type="email"
								value={state.value}
								placeholder="Enter you email"
								onChange={e => handleChange(e.target.value)}
								autoComplete="off"
							/>
							{state.meta.errors && (
								<p className="text-xs/none text-destructive/70">
									{state.meta.errors[0]?.message}
								</p>
							)}
						</div>
					)}
				</Field>
				<Field name="password">
					{({ state, handleChange }) => (
						<div className="space-y-2">
							<Label htmlFor="password">Password</Label>
							<Input
								id="password"
								type="password"
								value={state.value}
								placeholder="Enter you password"
								onChange={e => handleChange(e.target.value)}
							/>
							{state.meta.errors && (
								<p className="text-xs/none text-destructive/70">
									{state.meta.errors[0]?.message}
								</p>
							)}
						</div>
					)}
				</Field>
				<Field name="remember">
					{({ state, handleChange }) => (
						<div className="flex gap-2">
							<Checkbox
								checked={state.value}
								onCheckedChange={e => handleChange(!!e)}
							/>
							<Label htmlFor="remember">Remember me</Label>
						</div>
					)}
				</Field>
				<Subscribe
					selector={state => [!state.canSubmit || state.isSubmitting, state.isSubmitting]}
				>
					{([canSubmit, isSubmitting]) => (
						<Button className="w-full" disabled={canSubmit}>
							{isSubmitting ? 'Logiing In...' : 'Login'}
						</Button>
					)}
				</Subscribe>
			</form>
		</div>
	);
};

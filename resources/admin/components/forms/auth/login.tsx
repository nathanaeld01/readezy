import { router } from '@inertiajs/react';
import { useForm } from '@tanstack/react-form';

import { Button } from '../../ui/button';
import { Checkbox } from '../../ui/checkbox';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { type Login, loginValidator } from '@/admin/lib/validators/auth';

export const LoginForm = () => {
	const { Field, handleSubmit, Subscribe } = useForm({
		defaultValues: {
			email: '',
			password: '',
			remember: false,
		} as Login,
		onSubmit: ({ value }) => router.post(route('admin.login'), value),
		validators: {
			onSubmit: loginValidator,
		},
	});

	const submitHandler = async (e: React.FormEvent) => {
		e.preventDefault();
		e.stopPropagation();
		await handleSubmit();
	};

	return (
		<div className="m-auto h-fit w-full max-w-sm space-y-8">
			<h1 className="text-center text-3xl font-semibold">Login</h1>
			<form className="space-y-4" noValidate onSubmit={submitHandler}>
				<Field name="email">
					{({ handleChange, state }) => (
						<div className="space-y-2">
							<Label htmlFor="email">Email</Label>
							<Input
								autoComplete="off"
								id="email"
								onChange={e => handleChange(e.target.value)}
								placeholder="Enter you email"
								type="email"
								value={state.value}
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
					{({ handleChange, state }) => (
						<div className="space-y-2">
							<Label htmlFor="password">Password</Label>
							<Input
								id="password"
								onChange={e => handleChange(e.target.value)}
								placeholder="Enter you password"
								type="password"
								value={state.value}
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
					{({ handleChange, state }) => (
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

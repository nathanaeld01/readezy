import { Head } from '@inertiajs/react';

import { GuestLayout } from '../layouts';
import { LoginForm } from '../components/forms/auth/login';

export default function Login() {
	return (
		<>
			<Head title="Login" />
			<LoginForm />
		</>
	);
}

Login.layout = (page: React.ReactElement) => <GuestLayout>{page}</GuestLayout>;

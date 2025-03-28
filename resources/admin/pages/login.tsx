import { Head } from '@inertiajs/react';

import { LoginForm } from '../components/forms/auth/login';
import { GuestLayout } from '../layouts';

export default function Login() {
	return (
		<>
			<Head title="Login" />
			<LoginForm />
		</>
	);
}

Login.layout = (page: React.ReactElement) => <GuestLayout>{page}</GuestLayout>;

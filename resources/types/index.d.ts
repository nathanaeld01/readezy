import { Config } from 'ziggy-js';

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
	auth: {
		user: User;
	};
	ziggy: Config & { location: string };
};

export interface User {
	email: string;
	email_verified_at?: string;
	id: number;
	name: string;
}

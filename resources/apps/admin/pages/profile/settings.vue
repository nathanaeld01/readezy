<script setup lang="ts">
	import { Head, usePage } from '@inertiajs/vue3';

	import { DeleteAccountForm, UpdateInformationForm, UpdatePasswordForm } from '@/admin/components/forms/profile';
	import { Card, CardContent, CardFooter } from '@/admin/components/ui/card';
	import { Separator } from '@/admin/components/ui/separator';
	import { AppLayout, ProfileLayout } from '@/admin/layout';

	const { roles } = usePage().props.auth;
</script>

<template>
	<Head title="Settings" />
	<AppLayout
		:links="[
			{ name: 'Profile', href: '/profile' },
			{ name: 'Settings', href: '/profile/settings' },
		]"
		class="grid gap-8 container lg:grid-cols-[300px_1fr]"
	>
		<ProfileLayout>
			<section class="space-y-4">
				<div>
					<h5 class="text-lg font-semibold">Profile Information</h5>
					<p class="text-foreground/70">Update your account's profile information.</p>
				</div>
				<Card>
					<UpdateInformationForm />
				</Card>
			</section>
			<Separator />
			<section class="space-y-4">
				<div>
					<h5 class="text-lg font-semibold">Change Password</h5>
					<p class="text-foreground/70">
						Update your account's password. Ensure your account is using a long, random password to stay
						secure.
					</p>
				</div>
				<Card>
					<UpdatePasswordForm />
				</Card>
			</section>
			<template v-if="!roles.includes('super admin')">
				<Separator />
				<section class="space-y-4">
					<div>
						<h5 class="text-lg font-semibold">Delete Account</h5>
						<p class="text-foreground/70">Permanently delete your account</p>
					</div>
					<Card>
						<CardContent class="max-w-xl space-y-4 p-6">
							<p class="text-foreground/70">
								Once your account is deleted, all of its resources and data will be permanently deleted.
								Before deleting your account, please download any data or information that you wish to
								retain. This action is irreversible.
							</p>
						</CardContent>
						<CardFooter class="px-6">
							<DeleteAccountForm />
						</CardFooter>
					</Card>
				</section>
			</template>
		</ProfileLayout>
	</AppLayout>
</template>

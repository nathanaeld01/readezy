<script setup lang="ts">
	import { Head, usePage } from '@inertiajs/vue3';

	import { BrowserSessionsForm } from '@/admin/components/forms/profile';
	import { Card, CardContent, CardFooter } from '@/admin/components/ui/card';
	import { AppLayout, ProfileLayout } from '@/admin/layout';

	const { sessions } = usePage().props;
</script>

<template>
	<Head title="Profile" />
	<AppLayout :links="[{ name: 'Profile', link: '/profile' }]" class="container grid gap-8 lg:grid-cols-[300px_1fr]">
		<ProfileLayout>
			<section class="space-y-4">
				<div>
					<h5 class="text-lg font-semibold">Browser Sessions</h5>
					<p class="text-foreground/70">
						Manage and log out your active sessions on other browsers and devices.
					</p>
				</div>
				<Card>
					<CardContent class="space-y-6 p-6">
						<div>
							<p class="text-foreground/70">
								If necessary, you may log out of all of your other browser sessions across all of your
								devices. Some of your recent sessions are listed below; however, this list may not be
								exhaustive. If you feel your account has been compromised, you should also update your
								password.
							</p>
						</div>
						<div v-if="sessions.length > 0" class="space-y-2.5 text-foreground/70">
							<div
								v-for="(session, index) in sessions"
								:key="index"
								class="flex max-w-md items-center gap-2.5"
							>
								<div
									class="flex size-12 rounded-lg text-xl/none"
									:class="[session.is_current_device ? 'bg-success/30 text-foreground' : 'bg-muted']"
								>
									<i
										:class="{
											'ri-computer-line': session.device.desktop,
											'ri-smartphone-line': session.device.mobile,
											'ri-tablet-line': session.device.tablet,
										}"
										class="m-auto"
									/>
								</div>
								<div class="flex flex-col gap-1.5">
									<p class="leading-none font-light">
										{{ session.device.platform }} - {{ session.device.browser }}
									</p>
									<p class="text-xs/none">
										{{ `${session.ip_address}, ${session.last_active}` }}
									</p>
								</div>
							</div>
						</div>
					</CardContent>
					<CardFooter class="px-6">
						<BrowserSessionsForm />
					</CardFooter>
				</Card>
			</section>
		</ProfileLayout>
	</AppLayout>
</template>

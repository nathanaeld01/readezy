import { Head } from '@inertiajs/react';
import { format } from 'date-fns';

import { EditAuthor } from '@/admin/components/edit-author';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@/admin/components/ui/table';
import { AdminLayout } from '@/admin/layouts/admin';

type Author = {
	date_of_birth: string;
	date_of_death: null | string;
	deleted_at: null | string;
	description: string;
	image_url: string;
	nationality: string;
	slug: string;
	title: string;
	website_url: null | string;
};

export default function View({ author }: { author: Author }) {
	const { deleted_at: _, slug, ...authorData } = author;
	const data = {
		...authorData,
		date_of_death: authorData.date_of_death ?? undefined,
		website_url: authorData.website_url ?? undefined,
	};

	return (
		<>
			<Head title={author.title} />
			<div className="flex items-center justify-between">
				<h2 className="text-2xl/none font-semibold">{author.title}</h2>
				<div className="flex items-center gap-2">
					<EditAuthor data={data} slug={slug} />
				</div>
			</div>
			<div className="grid grid-cols-[250px_1fr] gap-4">
				<div className="aspect-[5/7] w-full overflow-hidden rounded-md border border-border">
					<img className="size-full object-cover object-top" src={author.image_url} />
				</div>
				<Table>
					<TableBody>
						<TableRow>
							<TableHead className="w-50 select-none">Title</TableHead>
							<TableCell>{author.title}</TableCell>
						</TableRow>
						<TableRow>
							<TableHead className="w-50 py-2 align-top select-none">
								Description
							</TableHead>
							<TableCell>
								{author.description.split('\r\n\r\n').map((line, index) => (
									<span className="text-wrap" key={index}>
										{line}
										{index <
											author.description.split('\r\n\r\n').length - 1 && (
											<>
												<br />
												<br />
											</>
										)}
									</span>
								))}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableHead className="w-50 select-none">Nationality</TableHead>
							<TableCell>{author.nationality}</TableCell>
						</TableRow>
						<TableRow>
							<TableHead className="w-50 select-none">Date of Birth</TableHead>
							<TableCell>
								{format(new Date(author.date_of_birth), 'MMMM dd, yyyy')}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableHead className="w-50 select-none">Date of Death</TableHead>
							<TableCell>
								{author.date_of_death ? (
									format(new Date(author.date_of_death), 'MMMM dd, yyyy')
								) : (
									<i className="font-light text-foreground/70 italic">NULL</i>
								)}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableHead className="w-50 select-none">Website URL</TableHead>
							<TableCell>
								{author.website_url ? (
									<a
										className="text-blue-400"
										href={author.website_url || undefined}
										rel="noreferrer"
										target="_blank"
									>
										{author.website_url}
									</a>
								) : (
									<i className="font-light text-foreground/70 italic">NULL</i>
								)}
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</div>
		</>
	);
}

View.layout = (page: React.ReactElement) => <AdminLayout className="space-y-4">{page}</AdminLayout>;

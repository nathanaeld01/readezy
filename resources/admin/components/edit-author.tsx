import { type EditAuthor as Data } from '../lib/validators/author';
import { EditAuthorForm } from './forms/author/edit';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetHeader, SheetModal, SheetTitle, SheetTrigger } from './ui/sheet';

export const EditAuthor = ({ data, slug }: { data: Data; slug: string }) => {
	return (
		<Sheet>
			{({ onClose }) => (
				<>
					<SheetTrigger asChild>
						<Button>
							<i className="hgi hgi-stroke hgi-edit-02" />
							<span>Edit Author</span>
						</Button>
					</SheetTrigger>
					<SheetModal>
						<SheetHeader>
							<SheetTitle>Edit Author</SheetTitle>
						</SheetHeader>
						<SheetContent>
							<EditAuthorForm data={data} onSuccess={onClose} slug={slug} />
						</SheetContent>
					</SheetModal>
				</>
			)}
		</Sheet>
	);
};

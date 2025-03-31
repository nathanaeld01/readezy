import { CreateAuthorForm } from './forms/author';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetHeader, SheetModal, SheetTitle, SheetTrigger } from './ui/sheet';

export const AddAuthor = () => (
	<Sheet>
		{({ onClose }) => (
			<>
				<SheetTrigger asChild>
					<Button>
						<i className="hgi hgi-stroke hgi-plus-sign" />
						<span>Create Author</span>
					</Button>
				</SheetTrigger>
				<SheetModal>
					<SheetHeader>
						<SheetTitle>Create Author</SheetTitle>
					</SheetHeader>
					<SheetContent>
						<CreateAuthorForm onSubmit={onClose} />
					</SheetContent>
				</SheetModal>
			</>
		)}
	</Sheet>
);

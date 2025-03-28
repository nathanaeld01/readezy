import { useState } from 'react';

import { Button } from './ui/button';
import { Sheet, SheetContent, SheetHeader, SheetModal, SheetTitle, SheetTrigger } from './ui/sheet';

type ChildrenProps = {
	open: boolean;
	setOpen: (value: boolean) => void;
};

type Props = {
	children: ({ open, setOpen }: ChildrenProps) => React.ReactNode;
	title: string;
	trigger: string;
};

export const CreateSheet = ({ children, title, trigger }: Props) => {
	const [open, setOpen] = useState(false);

	return (
		<Sheet onOpenChange={setOpen} open={open}>
			<SheetTrigger asChild>
				<Button>
					<i className="hgi hgi-stroke hgi-plus-sign" />
					<span>{trigger}</span>
				</Button>
			</SheetTrigger>
			<SheetModal>
				<SheetHeader>
					<SheetTitle>{title}</SheetTitle>
				</SheetHeader>
				<SheetContent>{children({ open, setOpen })}</SheetContent>
			</SheetModal>
		</Sheet>
	);
};

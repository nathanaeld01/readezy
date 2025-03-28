import { useState } from 'react';

import { Sheet, SheetContent, SheetHeader, SheetModal, SheetTitle, SheetTrigger } from './ui/sheet';
import { Button } from './ui/button';

type ChildrenProps = {
	open: boolean;
	setOpen: (value: boolean) => void;
};

type Props = {
	title: string;
	trigger: string;
	children: ({ open, setOpen }: ChildrenProps) => React.ReactNode;
};

export const CreateSheet = ({ title, trigger, children }: Props) => {
	const [open, setOpen] = useState(false);

	return (
		<Sheet open={open} onOpenChange={setOpen}>
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

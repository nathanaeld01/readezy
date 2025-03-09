import { Button } from '../../ui/button';
import { Sheet, SheetContent, SheetTrigger } from '../../ui/sheet';

export const CreateAuthorForm = () => {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button>
					<i className="hgi hgi-stroke hgi-plus-sign" />
					<span>Add Author</span>
				</Button>
			</SheetTrigger>
			<SheetContent></SheetContent>
		</Sheet>
	);
};

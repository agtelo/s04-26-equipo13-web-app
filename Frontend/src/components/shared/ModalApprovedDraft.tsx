import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

interface Props {
  isPublished: boolean;
  id: string;
  content: string;
  typeContent: string;
  onApprove: (
    id: string,
    isPublished: boolean,
    typeContent: string,
    content: string,
  ) => void;
}

export const ModalApprovedDraft = (props: Props) => {
  const { id, isPublished, typeContent, content, onApprove } = props;
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {!isPublished && (
          <Button className="rounded-full text-[10px] font-black uppercase tracking-widest px-10 h-12 gap-2 shadow-xl">
            <CheckCircle2 className="w-4 h-4" />
            Approve Draft
          </Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader className="p-5">
          <AlertDialogTitle>confirm Approval?</AlertDialogTitle>
          <AlertDialogDescription>
            Approving this draft will mark it as final. Once approved, the
            content is ready to be published and cannot be reverted back to a
            draft state without creating a new copy. Are you sure you want to
            proceed?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="rounded-full text-[10px] font-black uppercase tracking-widest px-7 h-10 gap-2 shadow-xl">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="rounded-full text-[10px] font-black uppercase tracking-widest px-7 h-10 gap-2 shadow-xl"
            onClick={() => onApprove(id, isPublished, content, typeContent)}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

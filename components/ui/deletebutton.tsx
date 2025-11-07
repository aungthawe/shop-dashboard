import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/tanstack";
import { api } from "@/lib/axios";
import { Button } from "@/components/ui/button";

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
interface DeleteButtonProps {
  id: number;
  entity: string;
}

export default function DeleteButton({ id, entity }: DeleteButtonProps) {
  const deleteMutation = useMutation({
    mutationFn: async () => {
      await api.delete(`/${entity}/${id}`);
    },
    onSuccess: () => {
      toast.success(`${entity} Deleted successfully!`);
      queryClient.invalidateQueries({ queryKey: [entity] });
    },
    onError:(e) =>{
      toast.error(`${entity} Deletion failed.${e.message}`)
    }
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button disabled={deleteMutation.isPending} variant="destructive">
          Delete
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. It will permanently delete this
            product.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => deleteMutation.mutate()}>
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

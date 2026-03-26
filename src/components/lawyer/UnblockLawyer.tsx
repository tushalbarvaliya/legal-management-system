import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog"
import type { LawyerDataType } from "@/types/lawyerType"
import { Field } from "../ui/field"
import { Button } from "../ui/button"
import { patchUnblockLawyer } from "@/api/lawyerAPI"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { queryClient } from "@/main"

const UnblockLawyer = ({
  lawyer,
  setOpenUnblock,
}: {
  lawyer: LawyerDataType
  setOpenUnblock: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const { mutate, isPending } = useMutation({
    mutationFn: patchUnblockLawyer,
    onSuccess: () => {
      toast.success("Unblock Lawyer Successfully", { duration: 1500 })
      queryClient.invalidateQueries({ queryKey: ["lawyer"] })
      setOpenUnblock(false)
    },
    onError: (error) => {
      toast.error(`Error ${error.message}`)
    },
  })
  return (
    <>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Unblock Lawyer</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <h1 className="capitalize">
            Are You Sure You Want to Block This Lawyer?
          </h1>
          <p>
            {lawyer.user.firstName} {lawyer.user.lastName}
          </p>
        </DialogDescription>
        <DialogFooter>
          <Field orientation={"horizontal"}>
            <Button
              variant={"outline"}
              onClick={() => {
                setOpenUnblock(false)
              }}
            >
              close
            </Button>
            <Button
              disabled={isPending}
              className="bg-green-500"
              onClick={() => {
                mutate({ id: lawyer.lawyer.id })
              }}
            >
              {isPending ? "Unblocking..." : "Unblock"}
            </Button>
          </Field>
        </DialogFooter>
      </DialogContent>
    </>
  )
}

export default UnblockLawyer

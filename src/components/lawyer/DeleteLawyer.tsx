import { deleteLawyer } from "@/api/lawyerAPI"
import { queryClient } from "@/main"
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog"
import type { LawyerDataType } from "@/data/lawyerData"
import { Field } from "../ui/field"
import { Button } from "../ui/button"

const DeleteLawyer = ({ lawyer }: { lawyer: LawyerDataType }) => {
  const navigate = useNavigate()
  const { mutate, isPending } = useMutation({
    mutationFn: deleteLawyer,
    onSuccess: () => {
      toast.success("Delete Lawyer Successfully", { duration: 1500 })
      queryClient.invalidateQueries({ queryKey: ["lawyer"] })
      setTimeout(() => {
        navigate("/lawyer")
      }, 1500)
    },
    onError: (error) => {
      toast.error(`Error ${error.message}`)
    },
  })
  return (
    <>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Block Lawyer</DialogTitle>
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
                navigate("/lawyer")
              }}
            >
              close
            </Button>
            <Button
              variant={"destructive"}
              disabled={isPending}
              onClick={() => {
                mutate(lawyer.lawyer.id)
              }}
            >
              {isPending ? "Deleting..." : "Delete"}
            </Button>
          </Field>
        </DialogFooter>
      </DialogContent>
    </>
  )
}

export default DeleteLawyer

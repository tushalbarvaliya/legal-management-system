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
import { useNavigate } from "react-router-dom"
import { blockLawyer } from "@/api/lawyerAPI"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { queryClient } from "@/main"

const BlockLawyer = ({ lawyer }: { lawyer: LawyerDataType }) => {
  const navigate = useNavigate()
  const { mutate, isPending } = useMutation({
    mutationFn: blockLawyer,
    onSuccess: () => {
      toast.success("Block Lawyer Successfully", { duration: 1500 })
      queryClient.invalidateQueries({ queryKey: ["lawyer"] })
      setTimeout(() => {
        navigate("/lawyer")
      }, 2000)
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
              disabled={isPending}
              onClick={() => {
                mutate(lawyer.lawyer.id)
              }}
            >
              {isPending ? "Blocking" : "Block"}
            </Button>
          </Field>
        </DialogFooter>
      </DialogContent>
    </>
  )
}

export default BlockLawyer

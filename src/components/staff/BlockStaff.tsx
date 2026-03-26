import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog"
import { Field } from "../ui/field"
import { Button } from "../ui/button"
import { useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { queryClient } from "@/main"
import type { StaffUserMapping } from "@/types/staffType"
import { blockStaff } from "@/api/staffAPI"

const BlockStaff = ({ staff }: { staff: StaffUserMapping }) => {
  const navigate = useNavigate()
  const { mutate, isPending } = useMutation({
    mutationFn: blockStaff,
    onSuccess: () => {
      toast.success("Block Staff Successfully", { duration: 1500 })
      queryClient.invalidateQueries({ queryKey: ["staff"] })
      setTimeout(() => {
        navigate("/staff")
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
          <DialogTitle>Block Staff</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <h1 className="capitalize">
            Are You Sure You Want to Block This Staff?
          </h1>
          <p>
            {staff.user.firstName} {staff.user.lastName}
          </p>
        </DialogDescription>
        <DialogFooter>
          <Field orientation={"horizontal"}>
            <Button
              variant={"outline"}
              onClick={() => {
                navigate("/staff")
              }}
            >
              close
            </Button>
            <Button
              disabled={isPending}
              onClick={() => {
                mutate(staff.staff.id)
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

export default BlockStaff

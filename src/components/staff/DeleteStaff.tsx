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
import { Field } from "../ui/field"
import { Button } from "../ui/button"
import type { StaffUserMapping } from "@/types/staffType"
import { deleteStaff } from "@/api/staffAPI"

const DeleteStaff = ({
  staff,
  setOpenDelete,
}: {
  staff: StaffUserMapping
  setOpenDelete: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const navigate = useNavigate()
  const { mutate, isPending } = useMutation({
    mutationFn: deleteStaff,
    onSuccess: () => {
      toast.success("Delete Lawyer Successfully", { duration: 1500 })
      queryClient.invalidateQueries({ queryKey: ["staff"] })
      setTimeout(() => {
        navigate("/staff")
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
          <DialogTitle>Delete Staff</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <h1 className="capitalize">
            Are You Sure You Want to Delete This Staff?
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
                setOpenDelete(false)
              }}
            >
              close
            </Button>
            <Button
              variant={"destructive"}
              disabled={isPending}
              onClick={() => {
                mutate(staff.staff.id)
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

export default DeleteStaff

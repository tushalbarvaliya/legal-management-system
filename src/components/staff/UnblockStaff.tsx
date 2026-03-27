import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog"
import { Field } from "../ui/field"
import { Button } from "../ui/button"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { queryClient } from "@/main"
import type { StaffUserMapping } from "@/types/staffType"
import { patchUnblockStaff } from "@/api/staffAPI"

const UnblockStaff = ({
  staff,
  setOpenUnblock,
}: {
  staff: StaffUserMapping
  setOpenUnblock: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const { mutate, isPending } = useMutation({
    mutationFn: patchUnblockStaff,
    onSuccess: () => {
      toast.success("Unblock Staff Successfully", { duration: 1500 })
      queryClient.invalidateQueries({ queryKey: ["staff"] })
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
          <DialogTitle>Unblock Staff</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <h1 className="capitalize">
            Are You Sure You Want to Unblock This Staff?
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
                setOpenUnblock(false)
              }}
            >
              close
            </Button>
            <Button
              disabled={isPending}
              className="bg-green-500"
              onClick={() => {
                mutate({ id: staff.staff.id })
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

export default UnblockStaff

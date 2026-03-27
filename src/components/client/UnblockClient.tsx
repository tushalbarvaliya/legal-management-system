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
import type { ClientUserMapping } from "@/types/clientType"
import { putUnblockClient } from "@/api/clientAPI"

const UnblockClient = ({
  client,
  setOpenUnblock,
}: {
  client: ClientUserMapping
  setOpenUnblock: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const { mutate, isPending } = useMutation({
    mutationFn: putUnblockClient,
    onSuccess: () => {
      toast.success("Unblock Lawyer Successfully", { duration: 1500 })
      queryClient.invalidateQueries({ queryKey: ["client"] })
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
            {client.user.firstName} {client.user.lastName}
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
                mutate(client.client.id)
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

export default UnblockClient

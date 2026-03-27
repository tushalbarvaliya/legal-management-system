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
import { putBlockClient } from "@/api/clientAPI"
import type { ClientDataType } from "@/types/clientType"

const BlockClient = ({
  client,
  setOpenBlock,
}: {
  client: ClientDataType
  setOpenBlock: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const { mutate, isPending } = useMutation({
    mutationFn: putBlockClient,
    onSuccess: () => {
      toast.success("Block Lawyer Successfully", { duration: 1500 })
      queryClient.invalidateQueries({ queryKey: ["client"] })
      setOpenBlock(false)
    },
    onError: (error) => {
      toast.error(`Error ${error.message}`)
    },
  })
  return (
    <>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Block Client</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <h1 className="capitalize">
            Are You Sure You Want to Block This Client?
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
                setOpenBlock(false)
              }}
            >
              close
            </Button>
            <Button
              disabled={isPending}
              onClick={() => {
                mutate(client.client.id)
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

export default BlockClient

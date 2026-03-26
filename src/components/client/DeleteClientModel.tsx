import { useNavigate } from "react-router-dom"

import { Button } from "../ui/button"
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog"
import { Field } from "../ui/field"
import { useMutation } from "@tanstack/react-query"
import { deleteClient } from "@/api/clientAPI"
import { toast } from "sonner"
import { queryClient } from "@/main"

const DeleteClientModel = ({ id }: { id: number }) => {
  const navigate = useNavigate()
  const { mutate } = useMutation({
    mutationFn: deleteClient,
    onSuccess: () => {
      toast.success(`Client is Delete`)
      queryClient.invalidateQueries({ queryKey: ["client"] })
      navigate("/client")
    },
    onError: (error) => {
      toast.success(`Error ${error}`)
    },
  })
  return (
    <>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-red-500">Delete Client</DialogTitle>
        </DialogHeader>
        <DialogDescription className="mt-2 text-sm text-black">
          Are you sure you want to delete this client?
        </DialogDescription>
        <span>{id}</span>

        <Field orientation={"horizontal"}>
          <Button
            variant={"outline"}
            onClick={() => {
              navigate("/client")
            }}
          >
            Close
          </Button>
          <Button
            variant={"destructive"}
            onClick={() => {
              mutate(id)
            }}
          >
            Delete
          </Button>
        </Field>
      </DialogContent>
    </>
  )
}

export default DeleteClientModel

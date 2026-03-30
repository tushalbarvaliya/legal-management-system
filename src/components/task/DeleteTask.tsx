import { toast } from "sonner"
import { useNavigate } from "react-router-dom"

import { Field } from "../ui/field"
import { Button } from "../ui/button"
import { useMutation } from "@tanstack/react-query"
import { deleteTask } from "@/api/taskAPI"
import { queryClient } from "@/main"
import type {  TaskResponse } from "@/types/taskType"
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog"

const DeleteTask = ({ task }: { task: TaskResponse }) => {
  const navigate = useNavigate()
  const { mutate ,isPending} = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      toast.success("Task Deleted")
      queryClient.invalidateQueries({ queryKey: ["tasks"] })
      navigate("/task")
    },
    onError: (error) => {
      toast.error(`Error ${error}`)
    },
  })
  return (
    <>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Lawyer</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <h1 className="capitalize">
            Are You Sure You Want to Delete This Lawyer?
          </h1>
          <p>
            {task.title}
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
                mutate(task.id)
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

export default DeleteTask

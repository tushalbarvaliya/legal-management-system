import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { useMutation, useQuery } from "@tanstack/react-query"

import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import type { CasesResponse } from "@/types/caseType"
import { getAllCases } from "@/api/caseAPI"
import { queryClient } from "@/main"
import type { StaffUserMapping } from "@/types/staffType"
import { updateTask } from "@/api/taskAPI"
import { useAppSelector } from "@/hooks/hooks"
import type { TaskResponse } from "@/types/taskType"
import { getAllStaff } from "@/api/staffAPI"
import {
  UpdateTaskSchema,
  type UpdateTaskType,
} from "@/schemas/UpdateTaskSchema"
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"

const UpdateTask = ({ task }: { task: TaskResponse }) => {
  const id = useAppSelector((state) => state.auth.id)
  const navigate = useNavigate()
  const { mutate, isPending } = useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      toast.success("Task Update Successfully")
      queryClient.invalidateQueries({ queryKey: ["tasks"] })
      navigate("/task")
    },
    onError: (error) => {
      toast.error(`Error ${error}`)
    },
  })
  const { data: caseData } = useQuery<CasesResponse>({
    queryKey: ["cases"],
    queryFn: getAllCases,
  })
  const { data: staffData } = useQuery<StaffUserMapping[]>({
    queryKey: ["staff"],
    queryFn: getAllStaff,
  })
  const {
    formState: { isDirty },
    ...form
  } = useForm<UpdateTaskType>({
    resolver: zodResolver(UpdateTaskSchema),
    mode: "onChange",
    delayError: 500,
    defaultValues: {
      title: task.title,
      description: task.description,
      caseId: task.caseId,
      priority: task.priority,
      assignedTo: task.assignedTo,
    },
  })
  const onSubmit = (data: UpdateTaskType) => {
    if (isDirty) {
      mutate({ data: data, id: task.id })
    } else {
      toast.success("No Changes Found", { duration: 700 })
      setTimeout(() => {
        navigate("/task")
      }, 700)
    }
  }
  return (
    <>
      <DialogContent className="no-scrollbar max-h-[99vh] min-w-[50vw] overflow-y-scroll">
        <DialogHeader className="my-4 text-sm">
          <DialogTitle>Update Task</DialogTitle>
        </DialogHeader>
        <form id="addLawyer" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="grid sm:grid-cols-2">
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="title">Task Title</FieldLabel>
                  <Input
                    {...field}
                    id="title"
                    placeholder="Enter Title"
                    autoComplete="off"
                    className="w-full"
                  />

                  {fieldState.error && (
                    <FieldError
                      errors={[fieldState.error]}
                      className="text-xs"
                    />
                  )}
                </Field>
              )}
            />
            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="description">Description</FieldLabel>
                  <Input
                    {...field}
                    id="description"
                    placeholder="Enter Description"
                    autoComplete="off"
                    className="w-full"
                  />

                  {fieldState.error && (
                    <FieldError
                      errors={[fieldState.error]}
                      className="text-xs"
                    />
                  )}
                </Field>
              )}
            />
            <Controller
              name="priority"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field className="space-y-2">
                  <FieldLabel>Priority</FieldLabel>

                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>

                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="caseId"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field className="space-y-2">
                  <FieldLabel>Case ID</FieldLabel>

                  <Select
                    onValueChange={(val) => field.onChange(Number(val))}
                    value={field.value ? String(field.value) : ""}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Case ID" />
                    </SelectTrigger>

                    <SelectContent>
                      {caseData &&
                        caseData.data.cases.map((item) => (
                          <SelectItem value={String(item.id)} key={item.id}>
                            {item.title}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>

                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="assignedTo"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field className="space-y-2">
                  <FieldLabel>Assign To</FieldLabel>

                  <Select
                    onValueChange={(val) => field.onChange(Number(val))}
                    value={field.value ? String(field.value) : ""}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Staff ID" />
                    </SelectTrigger>

                    <SelectContent>
                      {id ? (
                        <SelectItem value={String(id)}>Self</SelectItem>
                      ) : null}

                      {staffData && staffData?.length > 0
                        ? staffData?.map((item) => (
                            <SelectItem
                              value={String(item.staff.id)}
                              key={item.staff.id}
                            >
                              {item.user.firstName} {item.user.lastName}
                            </SelectItem>
                          ))
                        : null}
                    </SelectContent>
                  </Select>

                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
        <DialogFooter>
          <Field>
            <Button type="submit" form="addLawyer" disabled={isPending}>
              {isPending ? "Updating..." : "Update Task"}
            </Button>
          </Field>
        </DialogFooter>
      </DialogContent>
    </>
  )
}

export default UpdateTask

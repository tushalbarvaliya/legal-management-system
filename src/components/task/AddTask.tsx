import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { useMutation, useQuery } from "@tanstack/react-query"

import { AddTaskSchema, type AddTaskType } from "@/schemas/AddTaskSchema"
import { Button } from "../ui/button"
import { addTask } from "@/api/taskAPI"
import { getAllCases } from "@/api/caseAPI"
import { queryClient } from "@/main"
import type { CasesResponse } from "@/types/caseType"
import { Input } from "../ui/input"
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field"
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

const AddTask = () => {
  const navigate = useNavigate()
  const { mutate, isPending } = useMutation({
    mutationFn: addTask,
    onSuccess: () => {
      toast.success("Task Add Successfully")
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
  const form = useForm<AddTaskType>({
    resolver: zodResolver(AddTaskSchema),
    mode: "onChange",
    delayError: 500,
  })
  const onSubmit = (data: AddTaskType) => {
    mutate(data)
  }
  return (
    <>
      <DialogContent className="no-scrollbar max-h-[99vh] min-w-[50vw] overflow-y-scroll">
        <DialogHeader className="my-4 text-sm">
          <DialogTitle>Add Task</DialogTitle>
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
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>

                    <SelectContent>
                      {caseData?.data.cases.map((item) => (
                        <SelectItem value={String(item.id)}>
                          {`${item.title}`}
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
              name="dueDate"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field className="space-y-2">
                  <FieldLabel>Due Date</FieldLabel>

                  <Input
                    type="date"
                    value={field.value ?? ""}
                    onChange={(e) => field.onChange(e.target.value || null)}
                  />

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
              {isPending ? "Adding..." : "Add Task"}
            </Button>
          </Field>
        </DialogFooter>
      </DialogContent>
    </>
  )
}

export default AddTask

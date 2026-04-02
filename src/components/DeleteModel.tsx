import type { UseMutateFunction } from "@tanstack/react-query"

import { Field } from "./ui/field"
import { Button } from "./ui/button"
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog"

const DeleteModel = ({
  setOpenDelete,
  title,
  subTitle,
  detailsTitle,
  isPending,
  mutate,
  id,
}: {
  setOpenDelete: React.Dispatch<React.SetStateAction<boolean>>
  title: string
  subTitle: string
  detailsTitle: string
  isPending: boolean
  mutate: UseMutateFunction<unknown, Error, number, unknown>
  id: number
}) => {
  return (
    <>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <h1 className="capitalize">{subTitle}</h1>
          <p>{detailsTitle}</p>
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
                mutate(id)
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

export default DeleteModel

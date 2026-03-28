import { type UseMutateFunction } from "@tanstack/react-query"
import { Field } from "./ui/field"
import { Button } from "./ui/button"
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog"

const BlockModel = ({
  title,
  subTitle,
  detailsTitle,
  isPending,
  mutate,
  id,
  onClosed,
}: {
  title: string
  subTitle: string
  detailsTitle: string
  isPending: boolean
  mutate: UseMutateFunction<unknown, Error, number, unknown>
  id: number
  onClosed: React.Dispatch<React.SetStateAction<boolean>>
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
                onClosed(false)
              }}
            >
              close
            </Button>
            <Button
              disabled={isPending}
              onClick={() => {
                mutate(id)
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

export default BlockModel

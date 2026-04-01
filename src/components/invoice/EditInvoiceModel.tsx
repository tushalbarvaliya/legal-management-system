import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import type { Payment } from "@/types/invoiceType"
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { useUpdateInvoiceMutation } from "@/store/services/invoiceAPI"
import { useGetCaseQuery } from "@/store/services/caseAPI"
import { useGetClientQuery } from "@/store/services/clientAPI"

const editInvoiceSchema = z.object({
  clientId: z.coerce
    .number<number>()
    .min(1, { message: "Please select a client" }),
  caseId: z.coerce.number<number>().min(1, { message: "Please select a case" }),
  totalAmount: z.coerce
    .number<number>()
    .nonnegative({ message: "Enter amount" }),
  totalHours: z.coerce
    .number<number>()
    .nonnegative({ message: "Enter total hours" }),
})

export type EditInvoiceFormDataType = z.input<typeof editInvoiceSchema>

const EditInvoiceModel = ({
  data,
  setOpen,
}: {
  data: Payment
  setOpen: (val: boolean) => void
}) => {
  const { data: caseData } = useGetCaseQuery()

  const { data: clientData } = useGetClientQuery()

  const [updateInvoice, { isLoading: isPending }] = useUpdateInvoiceMutation()

  const {
    control,
    handleSubmit,
    formState: { isDirty },
  } = useForm<EditInvoiceFormDataType>({
    resolver: zodResolver(editInvoiceSchema),
    defaultValues: {
      clientId: data.clientId,
      caseId: data.caseId,
      totalAmount: data.totalAmount,
      totalHours: data.totalHours,
    },
    mode: "onChange",
  })

  const onSubmit = async (formData: EditInvoiceFormDataType) => {
    if (isDirty) {
      try {
        await updateInvoice({ data: formData, id: data.id }).unwrap()
        toast.success("Invoice Updated Successfully")
        setOpen(false)
      } catch {
        toast.error(`Something is not right`)
      }
    } else {
      toast.success("No Changes found")
      setOpen(false)
    }
  }
  return (
    <>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span className="text-xl font-bold text-zinc-900">
              Edit Invoice
            </span>
          </DialogTitle>
        </DialogHeader>

        <form
          className="space-y-4 text-sm text-zinc-700"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Client */}
          <Controller
            name="clientId"
            control={control}
            render={({ field, fieldState }) => (
              <div>
                <label className="mb-1 block font-medium text-zinc-700">
                  Client
                </label>
                <select
                  {...field}
                  className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm text-zinc-900 focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
                >
                  <option value="">Select ...</option>
                  {clientData?.data.map((item) => (
                    <option value={item.client.id} key={item.client.id}>
                      {item.user.firstName} {item.user.lastName}
                    </option>
                  ))}
                </select>
                {fieldState.error && (
                  <p className="min-h-5 text-xs text-red-600">
                    {fieldState.error.message}
                  </p>
                )}
              </div>
            )}
          />

          {/* Case */}
          <Controller
            name="caseId"
            control={control}
            render={({ field, fieldState }) => (
              <div>
                <label className="mb-1 block font-medium text-zinc-700">
                  Case
                </label>
                <select
                  {...field}
                  className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm text-zinc-900 focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
                >
                  <option value="">Select ...</option>
                  {caseData?.data.cases.map((item) => (
                    <option value={item.id} key={item.id}>
                      {item.title}
                    </option>
                  ))}
                </select>
                {fieldState.error && (
                  <p className="min-h-5 text-xs text-red-600">
                    {fieldState.error.message}
                  </p>
                )}
              </div>
            )}
          />

          {/* Amount + Hours */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Controller
              name="totalAmount"
              control={control}
              render={({ field, fieldState }) => (
                <div>
                  <label className="mb-1 block font-medium text-zinc-700">
                    Total Amount
                  </label>
                  <input
                    type="number"
                    {...field}
                    className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none focus:border-zinc-400"
                  />
                  {fieldState.error && (
                    <p className="min-h-5 text-xs text-red-600">
                      {fieldState.error.message}
                    </p>
                  )}
                </div>
              )}
            />

            <Controller
              name="totalHours"
              control={control}
              render={({ field, fieldState }) => (
                <div>
                  <label className="mb-1 block font-medium text-zinc-700">
                    Total Hours
                  </label>
                  <input
                    type="number"
                    {...field}
                    className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none focus:border-zinc-400"
                  />
                  {fieldState.error && (
                    <p className="min-h-5 text-xs text-red-600">
                      {fieldState.error.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>

          <DialogFooter className="mt-4 flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Editing..." : "Edit Invoice"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </>
  )
}

export default EditInvoiceModel

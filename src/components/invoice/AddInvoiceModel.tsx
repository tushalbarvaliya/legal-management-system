import { useForm, Controller } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { useAddInvoiceMutation } from "@/store/services/invoiceAPI"
import { useGetCaseQuery } from "@/store/services/caseAPI"
import { useGetClientQuery } from "@/store/services/clientAPI"

const addInvoiceSchema = z.object({
  clientId: z.coerce.number<number>().min(1, { message: "Client is required" }),
  caseId: z.coerce.number<number>().min(1, { message: "Case is required" }),
  totalAmount: z.coerce
    .number<number>()
    .min(0, { message: "Amount is required" }),
  totalHours: z.coerce
    .number<number>()
    .min(0, { message: "Hours is required" }),
  companyId: z.coerce.number<number>(),
})

export type AddInvoiceFormDataType = z.input<typeof addInvoiceSchema>

const AddInvoiceModel = ({ setOpen }: { setOpen: (val: boolean) => void }) => {
  const { data: caseData } = useGetCaseQuery()

  const { data: clientData } = useGetClientQuery()

  const [addInvoice, { isLoading: isPending }] = useAddInvoiceMutation()

  const { control, handleSubmit } = useForm<AddInvoiceFormDataType>({
    resolver: zodResolver(addInvoiceSchema),
    defaultValues: { companyId: 1 },
  })

  const onSubmit = async (data: AddInvoiceFormDataType) => {
    try {
      await addInvoice({ data }).unwrap()
      toast.success("Invoice added successfully")
      setOpen(false)
    } catch {
      toast.error(`Something is not right`)
    }
  }

  return (
    <>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Add New Invoice</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Client */}
          <Controller
            name="clientId"
            control={control}
            render={({ field, fieldState }) => (
              <div>
                <label className="mb-1 block font-medium">Client</label>
                <Select
                  onValueChange={(val) => field.onChange(Number(val))}
                  value={field.value ? String(field.value) : ""}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Client" />
                  </SelectTrigger>
                  <SelectContent>
                    {clientData?.data.map((item) => (
                      <SelectItem
                        key={item.client.id}
                        value={String(item.client.id)}
                      >
                        {item.user.firstName} {item.user.lastName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {fieldState.error && (
                  <p className="mt-1 text-xs text-red-500">
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
                <label className="mb-1 block font-medium">Case</label>
                <Select
                  onValueChange={(val) => field.onChange(Number(val))}
                  value={field.value ? String(field.value) : ""}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Case" />
                  </SelectTrigger>
                  <SelectContent>
                    {caseData?.data.cases.map((item) => (
                      <SelectItem key={item.id} value={String(item.id)}>
                        {item.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {fieldState.error && (
                  <p className="mt-1 text-xs text-red-500">
                    {fieldState.error.message}
                  </p>
                )}
              </div>
            )}
          />

          {/* Total Amount */}
          <Controller
            name="totalAmount"
            control={control}
            render={({ field, fieldState }) => (
              <div>
                <label className="mb-1 block font-medium">Total Amount</label>
                <Input type="number" {...field} placeholder="Enter amount" />
                {fieldState.error && (
                  <p className="mt-1 text-xs text-red-500">
                    {fieldState.error.message}
                  </p>
                )}
              </div>
            )}
          />

          {/* Total Hours */}
          <Controller
            name="totalHours"
            control={control}
            render={({ field, fieldState }) => (
              <div>
                <label className="mb-1 block font-medium">Total Hours</label>
                <Input type="number" {...field} placeholder="Enter hours" />
                {fieldState.error && (
                  <p className="mt-1 text-xs text-red-500">
                    {fieldState.error.message}
                  </p>
                )}
              </div>
            )}
          />

          <DialogFooter className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Adding..." : "Add Invoice"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </>
  )
}

export default AddInvoiceModel

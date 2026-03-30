import { useForm, Controller } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery } from "@tanstack/react-query"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getAllCases } from "@/api/caseAPI"
import { getAllClient } from "@/api/clientAPI"
import { addInvoice } from "@/api/invoiceAPI"
import { queryClient } from "@/main"
import type { CasesResponse } from "@/types/caseType"
import type { ClientResponse } from "@/types/clientType"
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
  const navigate = useNavigate()

  const { data: caseData } = useQuery<CasesResponse>({
    queryKey: ["cases"],
    queryFn: getAllCases,
  })

  const { data: clientData } = useQuery<ClientResponse>({
    queryKey: ["client"],
    queryFn: getAllClient,
  })

  const { mutate, isPending } = useMutation({
    mutationFn: addInvoice,
    onSuccess: () => {
      toast.success("Invoice added successfully")
      queryClient.invalidateQueries({ queryKey: ["invoices"] })
      setOpen(false)
      navigate("/invoice")
    },
    onError: (error) => {
      toast.error(`Error: ${error}`)
    },
  })

  const { control, handleSubmit } = useForm<AddInvoiceFormDataType>({
    resolver: zodResolver(addInvoiceSchema),
    defaultValues: { companyId: 1 },
  })

  const onSubmit = (data: AddInvoiceFormDataType) => mutate(data)

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

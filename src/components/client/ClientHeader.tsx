import { useState } from "react"
import { Plus } from "lucide-react"

import { useAppSelector } from "@/hooks/hooks"
import { Dialog } from "../ui/dialog"
import { Button } from "../ui/button"
import AddClient from "./AddClient"

const ClientHeader = () => {
  const role = useAppSelector((state) => state.auth.role)
  const [openAdd, setOpenAdd] = useState<boolean>(false)

  return (
    <Dialog
      open={openAdd}
      onOpenChange={(open) => {
        if (!open) {
          setOpenAdd(false)
        }
      }}
    >
      {openAdd && <AddClient setOpenAdd={setOpenAdd} />}
      {role == "lawyer" && (
        <Button
          className="fixed right-4 bottom-2 z-20 h-14 w-14 rounded-full p-6 hover:cursor-pointer"
          onClick={() => {
            setOpenAdd(true)
          }}
        >
          <Plus className="dark:stroke-black" />
        </Button>
      )}
    </Dialog>
  )
}

export default ClientHeader

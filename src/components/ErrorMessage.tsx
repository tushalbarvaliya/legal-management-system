import { AlertTriangle } from "lucide-react"

interface ErrorMessageProps {
  message?: string
}

const ErrorMessage = ({
  message = "Something went wrong. Please try again.",
}: ErrorMessageProps) => {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex w-full items-center justify-center rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
        <div className="flex items-center gap-2">
          <AlertTriangle size={20} />
          <p className="text-sm font-medium capitalize">{message}</p>
        </div>
      </div>
    </div>
  )
}

export default ErrorMessage

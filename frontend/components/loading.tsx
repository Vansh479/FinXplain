import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <Loader2 className="h-8 w-8 animate-spin text-teal-500 mb-4" />
      <p className="text-sm font-medium text-slate-500">Generating answer...</p>
    </div>
  )
}

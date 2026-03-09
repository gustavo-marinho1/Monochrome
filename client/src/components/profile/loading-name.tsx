import { Loader2 } from "lucide-react";

const LoadingName = () => (
  <div className="h-9.5 flex items-center gap-1">
    <span>Loading</span>
    <Loader2 size={15} className="animate-spin" />
  </div>
)

export { LoadingName }
import { User } from "lucide-react"

interface Props {
  src?: string
}

export const Photo = ({src}: Props) => {
  return (
    <div className="h-full rounded-full dark:bg-neutral-800 p-0.5">
      <div className="h-full flex items-center justify-center aspect-square rounded-full overflow-hidden">
        {src ? (
          <img src={src} alt="Preview" className="w-full h-full object-cover cursor-default" />
        ) : (
          <User />
        )}
      </div>
    </div>
  )
}
import { Menu } from "lucide-react"

export const Sidebar = () => {
  return (
    <div className="flex justify-start md:hidden">
      <button className="">
        <Menu className="h-6 w-6" />
      </button>
    </div>
  )
}
export const ButtonHeaderAction = ({ children, onClick }: {
  children: React.ReactNode,
  onClick?: () => void
}) => {
  return (
    <button onClick={onClick}>
      {children}
    </button>
  )
}

export const ButtonHeaderDropDown = ({ icon, label, action }: {
  icon: React.ReactNode,
  label: string,
  action: () => void
}) => {
  return (
    <button className="w-full hover:bg-black/5 dark:hover:bg-white/3 transition" onClick={() => action()}>
      <div className="flex items-center py-2 pl-2 pr-6">
        <div className="w-5 flex jusitfy-center items-center mr-5 ml-1">
          {icon}
        </div>
        <div className="text-sm">
          {label}
        </div>
      </div>
    </button>
  )
}
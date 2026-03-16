interface Props {
  children: React.ReactNode
  isActive: boolean,
  onClick: () => void
}

export const ButtonFilter = ({ children, isActive, onClick }: Props) => {
  return (
    <button onClick={onClick} className={`
      p-2 border rounded-sm
      ${isActive ? "bg-neutral-200/80 dark:bg-neutral-800" : ""}
      ${isActive ? "border-neutral-500" : "border-neutral-300 dark:border-neutral-600"}
    `}>
      {children}
    </button>
  )
};
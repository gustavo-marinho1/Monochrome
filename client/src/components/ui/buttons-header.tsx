interface Props {
  children: React.ReactNode,
  onClick?: () => void
}

export const ButtonHeaderAction = ({ children, onClick }: Props) => {
  return (
    <button onClick={onClick}>
      {children}
    </button>
  )
}
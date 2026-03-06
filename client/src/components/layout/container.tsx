interface Props {
  children: React.ReactNode,
  size?: string
}

const Container = ({children, size}: Props) => {
  return (
    <div className={`${size ? size : ""} bg-white dark:bg-neutral-900 rounded-xl border border-neutral-300/70 dark:border-neutral-700/80 overflow-hidden`}>
      {children}
    </div>
  )
}

export { Container }
interface Props {
  children: React.ReactNode,
  size?: string,
  rounded?: string
}

const Container = ({children, size, rounded}: Props) => {
  return (
    <div className={`
      bg-white dark:bg-neutral-900 border border-neutral-300/70 dark:border-neutral-700/80 overflow-hidden
      ${size ? size : ""}
      ${rounded ? rounded : "rounded-xl"}
    `}>
      {children}
    </div>
  )
}

export { Container }
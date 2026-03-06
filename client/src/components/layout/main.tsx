interface Props {
  children: React.ReactNode
}

const Main = ({ children }: Props) => {
  return (
    <main className="w-full min-h-screen flex-[1] flex flex-col">
      {children}
    </main>
  )
}

const MainAuth = ({children}: Props) => {
  return (
    <main className="w-screen min-h-screen flex flex-col justify-between">
      {children}
    </main>
  )
}

export { Main, MainAuth }
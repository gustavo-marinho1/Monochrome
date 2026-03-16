import { ButtonFilter } from "./button-filter"

type Props = {
  label: string
  setSort: () => void
  isActive: boolean
}

const OptionSort= ({ label, setSort, isActive }: Props) => {
  return (
    <ButtonFilter isActive={isActive} onClick={() => setSort()}>
      {label}
    </ButtonFilter>
  )
}

export { OptionSort }
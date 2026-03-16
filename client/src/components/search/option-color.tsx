import { ButtonFilter } from "./button-filter"

type Props = {
  color: string
  label: string
  setColor: () => void
  isActive: boolean
}

const OptionColor = ({ color, label, setColor, isActive }: Props) => {
  return (
    <ButtonFilter isActive={isActive} onClick={() => setColor()}>
      <div className="flex items-center gap-2 cursor-pointer" >
        <div className="w-5 h-5 rounded-full" style={{ backgroundColor: color }}></div>
        <span>{label}</span>
      </div>
    </ButtonFilter>
  )
}

export { OptionColor }
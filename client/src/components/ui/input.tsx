import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"

interface Props {
  id?: string
  name?: string
  register?: any
  password?: boolean
  label?: string
  value?: string
  setValue?: (v: string) => void,
  error?: boolean,
  disabled?: boolean,
  ref?: any
}

export const Input = ({id, name, register, password, label, value, setValue, error, disabled, ref}: Props) => {
  const [hide, setHide] = useState<boolean>(true);

  return (
    <div className="w-full flex flex-col gap-1">

      {label && (
        <label htmlFor={name}>
          {label}
        </label>
      )}

      <div className="relative">
        <input
          id={id}
          name={name}
          {...register}
          value={value ?? ""}
          disabled={disabled}
          ref={ref}
          type={password && hide ? "password" : undefined}
          onChange={(e) => {
            if (setValue) setValue(e.target.value);
          }}
          className={`
            w-full h-9.5 rounded-lg border border-neutral-400/80 dark:border-neutral-500/70 px-2
          `}
          style={{
            borderColor: error ? "rgb(255,80,80)" : ""
          }}
        />
        {password && (
          <div className="absolute top-0 right-0 h-full flex justify-center items-center px-2">
            <button type="button" className="cursor-pointer" onClick={() => setHide(!hide)}>
              {hide ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        )}
      </div>

    </div>
  )
}
import type { ChangeEvent } from "react"




interface InputProps {
  handleChange?: (e: ChangeEvent<HTMLInputElement>) => void
  type: "text" | "password" | "email" | "checkbox"
  placeholder?: string
  value?: string
  name: string
  id: string
  required?: boolean
  label: string
  error?: string
  touched?: boolean
  onBlur?: () => void
}


export default function Input({ handleChange, type = "text", placeholder, id, required, value, label, name, error, touched, onBlur }: InputProps) {
  const hasError = Boolean(error && touched)
  return (
    <label className="flex flex-col gap-1.5 w-full max-w-sm text-sm font-bold text-black">
      {label}
      <input
        id={id}
        type={type}
        value={value}
        name={name}
        onChange={handleChange}
        placeholder={placeholder}
        onBlur={onBlur}
        required={required}

        className={`w-full
           bg-[#EBF3FE]
           ${hasError ? "border-red-500" : "border-gray-700"}
           text-gray-800 text-sm border  px-3 py-2 rounded-none focus:outline-none `}
      />
      {
        hasError && (
          <span className="text-xs text-red-500">
            {error}
          </span>
        )
      }
    </label>
  )
}


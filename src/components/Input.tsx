import type { ChangeEvent } from "react"




interface InputProps {
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void
  type: "text" | "password" | "email" | "checkbox"
  placeholder?: string
  value?: string
  name: string
  id: string
  required?: boolean
  label: string
}

export default function Input({ handleChange, type = "text", placeholder, value, name, id, required, label }: InputProps) {
  return (
    <label className="flex flex-col gap-1.5 w-full max-w-sm text-sm font-bold text-black">
      {label}
      <input
        id={id}
        type={type}
        onChange={handleChange}
        placeholder={placeholder}
        value={value}
        name={name}
        required={required}
        className="w-full bg-[#EBF3FE] text-gray-800 text-sm border border-gray-700 px-3 py-2 rounded-none focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
    </label>
  )
}


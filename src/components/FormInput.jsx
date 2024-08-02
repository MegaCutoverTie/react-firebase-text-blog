import { forwardRef } from "react"

const FormInput = forwardRef(({type, placeholder, onChange, onBlur, name, label, error }, ref) => {
    const errorClassLabel = error 
    ? "block my-2 text-sm font-medium text-red-700 bg-red-200 rounded-md dark:text-red-500"
    : "block my-2 text-sm font-medium text-gray-950 dark:text-gray-400"

    const errorClassInput = error 
    ? "rounded-xl bg-red-50 border border-red-300 text-gray-900 placeholder-red-600 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-red-700 dark:border-gray-600 dark:placeholder-red-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    : "rounded-xl bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

    return(
        <div className="mb-2">
        <label htmlFor={label} className={errorClassLabel}>{label}:</label>
        <input type={type} placeholder={placeholder} ref={ref} onChange={onChange} onBlur={onBlur} name={name} className={errorClassInput}/>
        </div>
    )
});

export default FormInput
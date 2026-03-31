import { useState } from 'react'

export default function AuthForm({
    fields = [],
    initialValues = {},
    submitLabel = 'Envoyer',
    onSubmit = () => { },
}) {
    const [values, setValues] = useState(() => {
        const base = {}
        fields.forEach((f) => {
            base[f.name] = initialValues[f.name] ?? ''
        })
        return base
    })

    const [errors, setErrors] = useState({})

    function handleChange(e) {
        const { name, value } = e.target
        setValues((v) => ({ ...v, [name]: value }))
    }

    function validate() {
        const err = {}
        fields.forEach((f) => {
            if (f.required && !values[f.name]) {
                err[f.name] = `${f.label || f.name} est requis`
            }
            if (f.validator && typeof f.validator === 'function') {
                const msg = f.validator(values[f.name], values)
                if (msg) err[f.name] = msg
            }
        })
        setErrors(err)
        return Object.keys(err).length === 0
    }

    function handleSubmit(e) {
        e.preventDefault()
        if (!validate()) return
        onSubmit(values)
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded shadow">
            {fields.map((f) => (
                <div className="mb-4" key={f.name}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{f.label}</label>
                    <input
                        name={f.name}
                        type={f.type || 'text'}
                        value={values[f.name]}
                        placeholder={f.placeholder || ''}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                    />
                    {errors[f.name] && <p className="text-red-600 text-sm mt-1">{errors[f.name]}</p>}
                </div>
            ))}

            <div className="flex items-center justify-end">
                <button type="submit" className="px-4 py-2 bg-primary text-white rounded">
                    {submitLabel}
                </button>
            </div>
        </form>
    )
}

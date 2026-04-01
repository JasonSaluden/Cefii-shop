import AuthForm from '../components/AuthForm'
import { register } from '../api/authApi'
import { useNavigate } from 'react-router-dom'

export default function Register() {
    const navigate = useNavigate()

    const fields = [
        { name: 'email', label: "Email", type: 'email', required: true },
        { name: 'password', label: "Mot de passe", type: 'password', required: true },
    ]

    async function handleSubmit(values) {
        try {
            const payload = { mail: values.email, password: values.password }
            await register(payload)
            navigate('/connection')
        } catch (err) {
            console.error(err)
            alert('Erreur lors de l\'inscription')
        }
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl mb-4 text-center">Inscription</h2>
            <AuthForm fields={fields} submitLabel="S'inscrire" onSubmit={handleSubmit} />
        </div>
    )
}

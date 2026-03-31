import AuthForm from '../components/AuthForm'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Connection() {
    const navigate = useNavigate()

    const fields = [
        { name: 'email', label: "Email", type: 'email', required: true },
        { name: 'password', label: "Mot de passe", type: 'password', required: true },
    ]

    async function handleSubmit(values) {
        try {
            // example API call - adapt endpoint
            await axios.post('/api/auth/login', values)
            navigate('/')
        } catch (err) {
            console.error(err)
            alert('Erreur de connexion')
        }
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl mb-4 text-center">Connexion</h2>
            <AuthForm fields={fields} submitLabel="Se connecter" onSubmit={handleSubmit} />
        </div>
    )
}

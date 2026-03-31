import AuthForm from '../components/AuthForm'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Register() {
    const navigate = useNavigate()

    const fields = [
        { name: 'nom', label: "Nom complet", type: 'text', required: true },
        { name: 'email', label: "Email", type: 'email', required: true },
        { name: 'password', label: "Mot de passe", type: 'password', required: true },
        {
            name: 'confirm',
            label: "Confirmer le mot de passe",
            type: 'password',
            required: true,
            validator: (val, all) => (val !== all.password ? "Les mots de passe ne correspondent pas" : null),
        },
    ]

    async function handleSubmit(values) {
        try {
            const payload = { nom: values.nom, email: values.email, password: values.password }
            await axios.post('/api/auth/register', payload)
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

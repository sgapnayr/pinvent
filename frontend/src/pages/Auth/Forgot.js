import { useState } from 'react'
import Card from '../../components/Card'
import './Auth.css'
import { AiOutlineMail, AiOutlineUserAdd } from 'react-icons/ai'
import { BiLoaderCircle } from 'react-icons/bi'
import { Link, useNavigate } from 'react-router-dom'
import { forgotPassword, validateEmail } from '../../services/authService'
import { toast } from 'react-toastify'

function Forgot() {
    const [Email, setEmail] = useState()

    const navigate = useNavigate()

    const handleForgot = async (e) => {
        e.preventDefault()
        if (!Email) {
            return toast.error("Please Enter an Email.")
        }

        if (!validateEmail(Email)) {
            return toast.error("Please Enter a valid Email.")
        }

        const userData = {
            Email
        }

        await forgotPassword(userData)
        setEmail('')
    }

    const handlePath = (path) => {
        navigate(path)
    }

    return (
        <div className='Home'>
            <div className='Nav'>
                <Link className="Logo" to='/'>
                    <BiLoaderCircle />  Trier
                </Link>
                <div className="LoginToggleButtons">
                    <button className="RegisterButton" onClick={() => handlePath('/login')}>
                        <div className='Icon'><AiOutlineUserAdd /></div>
                        Login
                    </button>
                    <button onClick={() => handlePath('/dashboard')}>Dashboard</button>
                </div>
            </div>

            <div className='UserFormCard'>
                <Card>
                    <div className="Form">
                        <div className='Nav'>
                            <Link className="Logo" to='/'>
                                <BiLoaderCircle />  Trier
                            </Link>
                        </div>

                        <form onSubmit={handleForgot}>
                            <h1 className='FormTitle'>Reset Password</h1>
                            <h5 className='FormDesc'>Email</h5>
                            <input placeholder='john@gmail.com' type="text" name="Email" value={Email} onChange={(e) => setEmail(e.target.value)} />
                            <button className='RegisterButton LoginButton'><AiOutlineMail className="LoginIcon" /> Send Email</button>
                            <Link to="/login">Go Back</Link>
                        </form>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default Forgot
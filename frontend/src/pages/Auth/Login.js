import Card from '../../components/Card'
import './Auth.css'
import { AiOutlineLogin, AiOutlineUserAdd } from 'react-icons/ai'
import { GiFarmTractor } from 'react-icons/gi'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { loginUser, validateEmail } from '../../services/authService'
import { SET_LOGIN, SET_NAME } from '../../redux/features/authSlice'
import Loader from '../../components/loader/Loader'

const initialState = {
    Email: "",
    Password: "", // TODO Add password confirm pop up
}

function Login() {
    const [IsLoading, setIsLoading] = useState(false)
    const [FormData, setFormData] = useState(initialState)
    const { Email, Password } = FormData

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...FormData, [name]: value })
    }

    const handleLogin = async (e) => {
        e.preventDefault()

        if (!Email || !Password) {
            return toast.error("All Fields Are Required.")
        }

        if (!validateEmail) {
            return toast.error("Please Enter a Valid Email.")
        }

        const userData = {
            Email, Password
        }

        setIsLoading(true)

        try {
            const data = await loginUser(userData)
            await dispatch(SET_LOGIN(true))
            await dispatch(SET_NAME(data.Name))
            navigate('/dashboard')
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            console.log(error.message)
        }
    }

    const handlePath = (path) => {
        navigate(path)
    }

    return (
        <div className='Home'>
            {IsLoading && <Loader />}
            <div className='Nav'>
                <Link className="Logo" to='/'>
                    <span className='LogoIcon'><GiFarmTractor /></span> Prestige Equipment
                </Link>
                <div className="LoginToggleButtons">
                    <button className="RegisterButton" onClick={() => handlePath('/register')}>
                        <div className='Icon'><AiOutlineUserAdd /></div>
                        Register
                    </button>
                    <button onClick={() => handlePath('/dashboard')}>Dashboard</button>
                </div>
            </div>

            <div className='UserFormCard'>
                <Card>
                    <div className="Form">
                        <div className='Nav'>
                            <Link className="Logo" to='/'>
                                <span className='LogoIcon'><GiFarmTractor /></span> Prestige Equipment
                            </Link>
                        </div>

                        <form onSubmit={handleLogin}>
                            <h1 className='FormTitle'>Login</h1>
                            <h5 className='FormDesc'>Email</h5>
                            <input placeholder='john@gmail.com' type="text" value={Email} name="Email" onChange={handleInputChange} />
                            <h5 className='FormDesc'>Password</h5>
                            <input placeholder='password123' type="password" value={Password} name="Password" onChange={handleInputChange} />
                            <button className='RegisterButton LoginButton'><AiOutlineLogin className="LoginIcon" /> Login</button>
                            <Link to="/forgotpassword">Forgot Password?</Link>
                        </form>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default Login
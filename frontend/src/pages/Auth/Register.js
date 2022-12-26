import { useState } from 'react'
import Card from '../../components/Card'
import './Auth.css'
import { AiOutlineLogin, AiOutlineUserAdd } from 'react-icons/ai'
import { GiFarmTractor } from 'react-icons/gi'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { registerUser, validateEmail } from '../../services/authService'
import { useDispatch } from 'react-redux'
import { SET_LOGIN, SET_NAME } from '../../redux/features/authSlice'
import Loader from '../../components/loader/Loader'

const initialState = {
    Name: "",
    Email: "",
    Password: "", // TODO Add password confirm pop up
}

function Register() {
    const [IsLoading, setIsLoading] = useState(false)
    const [FormData, setFormData] = useState(initialState)
    const { Name, Email, Password } = FormData

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...FormData, [name]: value })
    }

    const handleRegister = async (e) => {
        e.preventDefault()

        if (!Name || !Email || !Password) {
            return toast.error("All Fields Are Required.")
        }

        if (Password.length < 6) {
            return toast.error("Password Must Be 6 Characters or More.")
        }

        if (!validateEmail) {
            return toast.error("Please Enter a Valid Email.")
        }

        const userData = {
            Name, Email, Password
        }

        setIsLoading(true)

        try {
            const data = await registerUser(userData)
            await dispatch(SET_LOGIN(true))
            await dispatch(SET_NAME(data.Name))
            navigate('/dashboard')
            setIsLoading(false)
            return toast.success('Registered Successfully.')
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
                                <span className='LogoIcon'><GiFarmTractor /></span> Prestige Equipment
                            </Link>
                        </div>

                        <form onSubmit={handleRegister}>
                            <h1 className='FormTitle'>Register</h1>
                            <h5 className='FormDesc'>Name</h5>
                            <input placeholder='John Doe' type="text" value={Name} name="Name" onChange={handleInputChange} />
                            <h5 className='FormDesc'>Email</h5>
                            <input placeholder='john@gmail.com' type="text" value={Email} name="Email" onChange={handleInputChange} />
                            <h5 className='FormDesc'>Password</h5>
                            <input placeholder='password123' type="password" value={Password} name="Password" onChange={handleInputChange} />
                            <button className='RegisterButton LoginButton'><AiOutlineLogin className="LoginIcon" /> Register</button>
                        </form>

                    </div>
                </Card>
            </div>
        </div>
    )
}

export default Register
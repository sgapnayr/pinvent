import Card from '../../components/Card'
import './Auth.css'
import { AiOutlineLogin, AiOutlineUserAdd } from 'react-icons/ai'
import { BiLoaderCircle } from 'react-icons/bi'
import { Link, useNavigate } from 'react-router-dom'

function Register() {
    const navigate = useNavigate()

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

                        <h1 className='FormTitle'>Register</h1>
                        <h5 className='FormDesc'>Name</h5>
                        <input placeholder='John Doe' type="text" />
                        <h5 className='FormDesc'>Email</h5>
                        <input placeholder='john@gmail.com' type="text" />
                        <h5 className='FormDesc'>Password</h5>
                        <input placeholder='password123' type="text" />
                        <button className='RegisterButton LoginButton'><AiOutlineLogin className="LoginIcon" /> Register</button>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default Register
import Card from '../../components/Card'
import './Auth.css'
import { AiOutlineCheckCircle, AiOutlineUserAdd } from 'react-icons/ai'
import { BiLoaderCircle } from 'react-icons/bi'
import { Link, useNavigate } from 'react-router-dom'

function Reset() {
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
                    <button className="RegisterButton" onClick={() => handlePath('/register')}>
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

                        <h1 className='FormTitle'>Reset Password</h1>
                        <h5 className='FormDesc'>New Password</h5>
                        <input placeholder='password123' type="text" />
                        <h5 className='FormDesc'>Confirm Password</h5>
                        <input placeholder='password123' type="text" />
                        <button className='RegisterButton LoginButton'><AiOutlineCheckCircle className="LoginIcon" /> Reset Password</button>
                        <Link to="/login">Go Back</Link>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default Reset
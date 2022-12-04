import Card from '../../components/Card'
import './Auth.css'
import { AiOutlineLogin, AiOutlineUserAdd } from 'react-icons/ai'
import { BiLoaderCircle } from 'react-icons/bi'
import { Link } from 'react-router-dom'

function Login() {
    return (
        <div className='Home'>
            <div className='Nav'>
                <Link className="Logo" to='/'>
                    <BiLoaderCircle />  Trier
                </Link>
                <div className="LoginToggleButtons">
                    <button className="RegisterButton">
                        <div className='Icon'><AiOutlineUserAdd /></div>
                        Register
                    </button>
                    <button>Dashboard</button>
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

                        <h1 className='FormTitle'>Login</h1>
                        <h5 className='FormDesc'>Email</h5>
                        <input placeholder='john@gmail.com' type="text" />
                        <h5 className='FormDesc'>Password</h5>
                        <input placeholder='password123' type="text" />
                        <button className='RegisterButton LoginButton'><AiOutlineLogin className="LoginIcon" /> Login</button>
                        <Link to="/forgotpassword">Forgot Password?</Link>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default Login
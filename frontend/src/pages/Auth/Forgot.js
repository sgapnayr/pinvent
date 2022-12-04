import Card from '../../components/Card'
import './Auth.css'
import { AiOutlineMail, AiOutlineUserAdd } from 'react-icons/ai'
import { BiLoaderCircle } from 'react-icons/bi'
import { Link } from 'react-router-dom'

function Forgot() {
    return (
        <div className='Home'>
            <div className='Nav'>
                <Link className="Logo" to='/'>
                    <BiLoaderCircle />  Trier
                </Link>
                <div className="LoginToggleButtons">
                    <button className="RegisterButton">
                        <div className='Icon'><AiOutlineUserAdd /></div>
                        Login
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

                        <h1 className='FormTitle'>Reset Password</h1>
                        <h5 className='FormDesc'>Email</h5>
                        <input placeholder='password123' type="text" />
                        <button className='RegisterButton LoginButton'><AiOutlineMail className="LoginIcon" /> Send Email</button>
                        <Link to="/login">Go Back</Link>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default Forgot
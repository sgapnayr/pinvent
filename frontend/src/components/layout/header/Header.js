import { logoutUser } from '../../../services/authService'
import { useDispatch, useSelector } from 'react-redux'
import { selectName, SET_LOGIN } from '../../../redux/features/authSlice'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import './Header.css'

function Header() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const Name = useSelector(selectName)

    const logout = async () => {
        await logoutUser()
        await dispatch(SET_LOGIN(false))
        navigate('/')
        return toast.success('Logged Out.')
    }

    return (
        <div className='Header'>
            <h1>
                {!Name ? '' : <>Welcome, <strong>{Name}!</strong></>}
            </h1>
            <button className='RegisterButton' onClick={logout}>
                Logout
            </button>
        </div>
    )
}

export default Header
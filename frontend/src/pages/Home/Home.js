import React from 'react'
import { GiFarmTractor } from 'react-icons/gi'
import { AiOutlineUserAdd, AiOutlineCheckCircle } from 'react-icons/ai'
import { GiBulldozer } from 'react-icons/gi'
import { Link } from 'react-router-dom'
import './Home.css'
import { useNavigate } from 'react-router-dom'
import { ShowOnLogin, ShowOnLogout } from '../../components/protect/hiddenLinks'

function Home() {
    const navigate = useNavigate()

    const handlePath = (path) => {
        navigate(path)
    }

    return (
        <div className='Home'>
            <div className='Nav'>
                <Link className="Logo" to='/'>
                    <span className='LogoIcon'><GiFarmTractor /></span> Prestige Equipment
                </Link>
                <div className="LoginToggleButtons">
                    <ShowOnLogout>
                        <button className="RegisterButton" onClick={() => handlePath('/register')}>
                            <div className='Icon'><GiBulldozer /></div>
                            Register
                        </button>
                        <button onClick={() => handlePath('/login')}>Login</button>
                    </ShowOnLogout>
                    <ShowOnLogin>
                        <button onClick={() => handlePath('/dashboard')}>Dashboard</button>
                    </ShowOnLogin>
                </div>
            </div>

            <div className="Body">
                <h1 className="BodyTitle">
                    Inventory. <br /> Management. <br />System.
                </h1>
                <p>
                    The Inventory solution to control and manage <br />
                    inventory within Prestige.
                </p>
                <h3 className='Tagline'>
                    "If it fits, it ships." - John M. Paglione
                </h3>
                <button className="RegisterButton" onClick={() => handlePath('/register')}>
                    <div className='Icon'><AiOutlineCheckCircle /></div>
                    Get Started
                </button>
            </div>
        </div>
    )
}

export default Home
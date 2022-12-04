import React from 'react'
import { BiLoaderCircle } from 'react-icons/bi'
import { AiOutlineUserAdd, AiOutlineCheckCircle } from 'react-icons/ai'
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
                    <BiLoaderCircle />  Trier
                </Link>
                <div className="LoginToggleButtons">
                    <ShowOnLogout>
                        <button className="RegisterButton" onClick={() => handlePath('/register')}>
                            <div className='Icon'><AiOutlineUserAdd /></div>
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
                    products in your business.
                </p>
                <p>
                    At price performant levels of less than a dollar a day,<br />
                    we have created - and streamlined - an IMS™ with<br />
                    modern security measures, an overly friendly user <br />
                    experience, and included vital management features to <br />
                    ultimately make robust growth in your business your only focus. <br />
                </p>
                <h3 className='Tagline'>
                    "So Simple, My Dad Uses It" - Founder
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
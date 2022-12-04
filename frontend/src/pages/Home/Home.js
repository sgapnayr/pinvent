import React from 'react'
import { BiLoaderCircle } from 'react-icons/bi'
import { AiOutlineUserAdd, AiOutlineCheckCircle } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import './Home.css'
import { useNavigate } from 'react-router-dom'

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
                    <button className="RegisterButton" onClick={() => handlePath('/register')}>
                        <div className='Icon'><AiOutlineUserAdd /></div>
                        Register
                    </button>
                    <button onClick={() => handlePath('/login')}>Login</button>
                    <button onClick={() => handlePath('/dashboard')}>Dashboard</button>
                </div>
            </div>

            <div className="Body">
                <h1 className="BodyTitle">
                    Inventory & Invoice <br /> Management System
                </h1>
                <p>
                    The Inventory solution to control and manage <br />
                    products in your company.
                </p>
                <p>
                    For less than a dollar a day, we have<br />
                    created - and streamlined - an IMS™ with<br />
                    an enterprise level backend, an overly friendly user <br />
                    experience, and all the robust management features <br />
                    to ultimately make growth in your business your only focus.
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
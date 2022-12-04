import React from 'react'
import { BiLoaderCircle } from 'react-icons/bi'
import { AiOutlineUserAdd, AiOutlineCheckCircle } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import './Home.css'

function Home() {
    return (
        <div className='Home'>
            <div className='Nav'>
                <Link className="Logo" to='/login'>
                    <BiLoaderCircle />  Trier
                </Link>
                <div className="LoginToggleButtons">
                    <button className="RegisterButton">
                        <div className='Icon'><AiOutlineUserAdd /></div>
                        Register
                    </button>
                    <button>Login</button>
                    <button>Dashboard</button>
                </div>
            </div>

            <div className="Body">
                <h1 className="BodyTitle">
                    Inventory & Stock <br /> Management Solution
                </h1>
                <p>
                    Inventory system to control and manage <br />
                    products in your company -  integrated to <br />
                    make growth in your business simple.
                </p>
                <button className="RegisterButton">
                    <div className='Icon'><AiOutlineCheckCircle /></div>
                    Get Started
                </button>
            </div>
        </div>
    )
}

export default Home
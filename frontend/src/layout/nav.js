import React from 'react'
import { BiLoaderCircle } from 'react-icons/bi'
import { AiOutlineUserAdd } from 'react-icons/ai'

function nav() {
    return (
        <div className='Nav'>
            <div className="Logo">
                <BiLoaderCircle />  Trier
            </div>
            <div className="LoginToggleButtons">
                <button className="RegisterButton">
                    <div className='Icon'><AiOutlineUserAdd /></div>
                    Register
                </button>
                <button>Login</button>
                <button>Dashboard</button>
            </div>
        </div>
    )
}

export default nav
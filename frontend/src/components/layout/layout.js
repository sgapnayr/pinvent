import React from 'react'
import Footer from './footer/Footer'
import Header from './header/Header'
import './Layout.css'

function layout({ children }) {
    return (
        <div className='Layout'>
            <Header />
            {children}
            <Footer />
        </div>
    )
}

export default layout
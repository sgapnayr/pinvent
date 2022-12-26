import './Sidebar.css'
import { BiLoaderCircle, BiMenuAltRight } from 'react-icons/bi'
import { GiFarmTractor, GiBulldozer } from 'react-icons/gi'
import { AiOutlineDashboard, AiOutlineShopping, AiOutlineProfile, AiOutlineBug } from 'react-icons/ai'
import { RiArrowRightSLine, RiArrowDownSLine } from 'react-icons/ri'
import { BsPersonCheck, BsPersonPlus } from 'react-icons/bs'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Sidebar() {
    const [Toggle, setToggle] = useState(false)
    const [ToggleAccount, setToggleAccount] = useState(false)
    const navigate = useNavigate()

    const handleNavigation = (path) => {
        navigate(path)
    }

    const Menu = [
        {
            title: "Dashboard",
            icon: <AiOutlineDashboard />,
            path: "/dashboard",
            index: 0
        },
        {
            title: "Add Machine",
            icon: <GiBulldozer />,
            path: "/add-product",
            index: 1
        },
        {
            title: "Account",
            icon: <AiOutlineProfile />,
            index: 2
        },
        {
            title: "Report a Bug",
            icon: <AiOutlineBug />,
            path: "/contact",
            index: 3
        },
    ]

    const subMenu = [
        {
            title: "Profile",
            icon: <BsPersonCheck />,
            path: "/profile"
        },
        {
            title: "Edit Profile",
            icon: <BsPersonPlus />,
            path: "/update-profile"
        },
    ]

    return (
        <div className={Toggle ? 'SideBarClosed' : 'SideBar'}>
            <div className="SubNav">
                <div className={Toggle ? "SubNavControlsHide" : "SubNavControls"}>
                    <div className={Toggle ? 'LogoHide' : 'SideBarHead'} to='/dashboard' >
                        <span className='LogoIcon'><GiFarmTractor /></span> Prestige
                    </div>
                    <div className="SideBarToggle" onClick={() => setToggle(!Toggle)}>
                        {Toggle ? <GiFarmTractor /> : <BiMenuAltRight />}
                    </div>
                </div>
            </div>
            {Menu.map((tab, idx) => {
                return (
                    <>
                        <div key={tab.title} className={Toggle ? 'SideBarTabClosed' : 'SideBarTab'} onClick={() => handleNavigation(tab.path)}>
                            <div className='SideBarIcon' onClick={() => setToggle(!Toggle)}>
                                {tab.icon}
                            </div>
                            <div className={Toggle ? 'LogoHide' : 'SideBarDesc'}>
                                {tab.title !== 'Account' ? tab.title : <>
                                    <div className='SideBarDesc' onClick={() => setToggleAccount(!ToggleAccount)}>
                                        {tab.title}
                                        {ToggleAccount ? <RiArrowDownSLine /> : <RiArrowRightSLine />}
                                    </div>
                                </>}
                            </div>
                        </div>
                        {tab.title !== 'Account' ? '' : tab.title === 'Account' && !ToggleAccount ? '' : <>
                            <div className='SubItem'>
                                {subMenu.map(subTab => {
                                    return (
                                        <div className={Toggle ? 'SubTabClosed' : 'SubTab'}>
                                            <div className={Toggle ? 'SubTabWrapperClosed' : "SubTabWrapper"}>
                                                <div className="SideBarIcon">
                                                    {subTab.icon}
                                                </div>
                                                <div className={Toggle ? 'LogoHide' : ''}>
                                                    {subTab.title}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </>}
                    </>
                )
            }
            )}

        </div >
    )
}

export default Sidebar
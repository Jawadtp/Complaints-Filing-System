import React from 'react'
import {BsPlus} from 'react-icons/bs'
import {FaSearch} from 'react-icons/fa'
import {RiSearchLine} from 'react-icons/ri'

const Landing = () => 
{

    function onMouseEnterNavbar()
    {
    /*    console.log('Mouse entered')
        const navDescs = document.getElementsByClassName('navBarItem')
        
        for(var i=0; i<navDescs.length; i++)
            navDescs[i].style.display='flex' */
    }

    function onMouseLeaveNavbar()
    {
       /* console.log('Mouse entered')
        const navDescs = document.getElementsByClassName('navBarItem')
        
        for(var i=0; i<navDescs.length; i++)
            navDescs[i].style.display='flex' */
        
    }
    
    return (
        <div className="pageWrapper">
            <div className="vertNavBar" onMouseOver={onMouseEnterNavbar} onMouseOut={onMouseLeaveNavbar}>
            
                <div className="navBarItem">
                    <RiSearchLine size={25} color={'white'}/><span className="navItemDesc">SEARCH ISSUES</span>
                </div>
                <div className="navBarItem">
                    <BsPlus size={30} color={'white'}/><span className="navItemDesc">CREATE ISSUES</span>
                </div>
            
            </div>

            <div className="pageContent">
                <div className="boardHome">board / home</div>
                <div className="complaints">Complaints</div>
                <input type='text' className="landingSearch" placeholder="Search.."/>
            </div>
        </div>
    )
}

export default Landing

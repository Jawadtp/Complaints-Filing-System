import React from 'react'
import {BsPlus} from 'react-icons/bs'
import {FaSearch} from 'react-icons/fa'
import {RiSearchLine} from 'react-icons/ri'

const Landing = () => 
{

    function onMouseEnterNavbar()
    {
     /*   console.log('Mouse entered')
        const navDescs = document.getElementsByClassName('navDesc')
        
        for(var i=0; i<navDescs.length; i++)
            navDescs[i].style.display='inline-block' */
    }

    function onMouseLeaveNavbar()
    {
      /*  console.log('Mouse left')
        const navDescs = document.getElementsByClassName('navDesc')
        
        for(var i=0; i<navDescs.length; i++)
            navDescs[i].style.display='none' 
            */
        
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
        </div>
    )
}

export default Landing

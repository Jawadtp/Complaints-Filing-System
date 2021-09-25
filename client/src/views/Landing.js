import React, {useState, useEffect} from 'react'
import {BsPlus} from 'react-icons/bs'
import {FaSearch} from 'react-icons/fa'
import {RiSearchLine} from 'react-icons/ri'
import ComplaintsView from '../components/ComplaintsView'
import CreateIssue from '../components/CreateIssue'


const Landing = () => 
{

    const [complaints, setComplaints] = useState([])
    const [view, setView] = useState(0) //Views: 0 - default, 1 - create issue

    useEffect(() => 
    {
        const comp = 
        [
            {
                'id':1,
                'title':'Unsanitary practices at mess',
                'name':'Sunadin Shen',
                'status': 0
            },
            {
                'id':2,
                'title':'Misbehaviour of resident professors',
                'name':'Herimu',
                'status': 0
            },
            {
                'id':3,
                'title':'Terrible internet coverage',
                'name':'Annen',
                'status': 1
            },
            {
                'id':4,
                'title':'Female visitors at B Hostel',
                'name':'Hedif',
                'status': 2
            },
        ]
        setComplaints(comp)

    },[]);

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
    
    function onCreateIssueClick()
    {
        setView(1) //1 - issue creation form view
    }


    function onSearchIssuesClick()
    {

    }

    return (
        <div className="pageWrapper">
            <div className="vertNavBar" onMouseOver={onMouseEnterNavbar} onMouseOut={onMouseLeaveNavbar}>
            
                <div className="navBarItem" onClick={onSearchIssuesClick}>
                    <RiSearchLine size={25} color={'white'}/><span className="navItemDesc">SEARCH ISSUES</span>
                </div>
                <div className="navBarItem" onClick={onCreateIssueClick}>
                    <BsPlus size={30} color={'white'}/><span className="navItemDesc">CREATE ISSUES</span>
                </div>
            
            </div>

            <div className="pageContent">
                {!view?<ComplaintsView complaints={complaints}/>:<CreateIssue/>}
            </div>
        </div>
    )
}

export default Landing

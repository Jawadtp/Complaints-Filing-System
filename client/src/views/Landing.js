import React, {useState, useEffect} from 'react'
import {BsPlus} from 'react-icons/bs'
import {RiSearchLine,RiAdminFill} from 'react-icons/ri'
import ComplaintsView from '../components/ComplaintsView'
import CreateIssue from '../components/CreateIssue'
import AdminLogin from '../components/AdminLogin'

const Landing = () => 
{

    const [complaints, setComplaints] = useState([])
    const [tags, setTags] = useState([])
    const [view, setView] = useState(0) //Views: 0 - default, 1 - register issue,2 - admin login

    useEffect(() => 
    {
        fetch('http://localhost:5000/complaints')
        .then(response => response.json())
        .then(data => onComplaintsReceive(data));

    },[]);

    function onComplaintsReceive(comps)
    {
        setComplaints(comps['tiles'])
        setTags(comps['tags'])
        console.log(comps['tiles'])
    }

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
        setView(0) //0 - complaints view

    }

    function onAdminLoginClick()
    {
        setView(2) //0 - complaints view
    }

    function setPageContent(view){
        if(view === 0){
            return(<ComplaintsView complaints={complaints} tags={tags}/>)
        }
        else if(view === 1){
            return(<CreateIssue/>)
        }
        else{
            return(<AdminLogin setView={setView}/>)
        }
    }

    return (
        <div className="pageWrapper">
            <div className="vertNavBar" onMouseOver={onMouseEnterNavbar} onMouseOut={onMouseLeaveNavbar}>
                <div className="navBarContainer">

                    <div className="navBarItem" onClick={onSearchIssuesClick}>
                        <RiSearchLine id="searchIcon" size={25} color={'white'}/><span className="navItemDesc">SEARCH ISSUES</span>
                    </div>

                    <div className="navBarItem" onClick={onCreateIssueClick}>
                        <BsPlus size={30} id="plusIcon" color={'white'}/><span className="navItemDesc">REGISTER ISSUES</span>
                    </div>

                    <div className="navBarItem" onClick={onAdminLoginClick}>
                        <RiAdminFill size={30} id="adminLogin" color={'white'}/><span className="navItemDesc">ADMIN LOGIN</span>
                    </div>
                </div>
                
            
            </div>

            <div className="pageContent">
                {setPageContent(view)}
                {/* {!view?<ComplaintsView complaints={complaints}/>:<CreateIssue/>} */}
            </div>
        </div>
    )
}

export default Landing

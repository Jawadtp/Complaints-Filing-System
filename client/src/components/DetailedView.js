import React, {useState, useEffect} from 'react'
import {BiUpvote} from 'react-icons/bi'
import {IoIosArrowBack } from 'react-icons/io'
const DetailedView = (props) => 
{
    
    const [complaint, setComplaintInfo] = useState({})
    const [isAdmin, setAdmin] = useState(false)
    const [admins, setAdmins] = useState([])
    const [votes, setVotes] = useState(0)

    const priorityText=
    {
        0: 'Low',
        1: 'Medium',
        2: 'High'
    }
    const priorityInt=
    {
        'Low':0,
        'Medium':1,
        'High':2
    }
    const statusInt=
    {
        'Open':0,
        'Assigned':1,
        'Closed':2
    }

    function onComplaintInfoLoad(data)
    {
        setComplaintInfo(data)
        setVotes(data.complaint.votes)
        console.log(data.complaint)
    }

    function findStatus(status){
        if(status===0){
            return(<span>Open</span>)
        }
        else if(status===1){
            return(<span>Assigned</span>)
        }
        else{
            return(<span>Closed</span>)
        }
    }

    function updateAdmins(adminList)
    {
        if(!Array.isArray(adminList)) return
        setAdmins(adminList)
        setAdmin(true)
        console.log('User is an administrator')
        console.log('List of all administrators: ')
        console.log(adminList)
    }

    function onUpvoteClick()
    {
        if(localStorage.getItem('hasVoted'+props.id)) return alert('You have already voted')
        localStorage.setItem('hasVoted'+props.id, true)

        fetch(`https://mycomplaints.herokuapp.com/complaints/${props.id}/upvote`, {
            method: 'POST'

           
            })
            .then(response => response.json())
            .then(result => 
                {
            setVotes(votes+1)
            console.log('Success:', result);
            })
            .catch(error => {
            console.error('Error:', error);
            });

    }

    useEffect(() => 
    {
        const token = localStorage.getItem('token')

        fetch("https://mycomplaints.herokuapp.com/admins/", {
      method: 'GET',
      headers: {Authorization: 'Bearer ' + token}
          }).then(response=> response.json()).then(data=>updateAdmins(data.admins))



        fetch('https://mycomplaints.herokuapp.com/complaints/'+props.id)
    .then(response => response.json())
    .then(data => onComplaintInfoLoad(data));

    },[]);


    function onUpdateClick()
    {

        const token = localStorage.getItem('token')
        const priorityText = document.getElementById('priorityEdit').value
        const statusText = document.getElementById('statusEdit').value
        const updatedInfo = 
        {
            'assignee': document.getElementById('adminsAssign').value,
            'priority': priorityInt[priorityText],
            'status': statusInt[statusText],
            'eta':document.getElementById('etaEditer').value
        }

        console.log('Posting updated data..')
        
     /*   fetch(`https://mycomplaints.herokuapp.com/complaints/${props.id}/edit`, {
      method: 'POST',
            headers: {Authorization: 'Bearer ' + token},
            body: JSON.stringify(updatedInfo)
          }) */

          fetch(`https://mycomplaints.herokuapp.com/complaints/${props.id}/edit`, {
            method: 'POST',

            body: JSON.stringify(updatedInfo),
            })
            .then(response => response.json())
            .then(result => 
                {
            console.log('Success:', result);
            window.location.reload()
            })
            .catch(error => {
            console.error('Error:', error);
            });

    }

    function onBackBtnClick()
    {
        console.log('Backbutton clicked')
        window.location.reload()
    }
    return (
        <div className="detailViewPageWrapper">
            <div className="backBtn" onClick={onBackBtnClick}>
                <IoIosArrowBack size='40px'/>
            </div>
            {Object.keys(complaint).length==0?'Loading':
            <div className="detailedViewWrapper">

                <div className="mainDetails">

                    <div className="issueTitle">
                        {complaint.complaint.title}
                    </div>

                    <div className="descHeader">
                        Description
                    </div>

                    <div className="issueDesc">
                        {complaint.complaint.description}
                    </div>

                    <div className="votesWrapper">
                        <div className="votesTitle">
                            Upvotes
                            
                        </div>
                        <div className="votes">
                            {votes}
                            <span className="voteIcon" onClick={onUpvoteClick}><BiUpvote/></span>
                        </div>

                    </div>

                </div>
                <div className="subDetails">
                    <h2>Reported by</h2>
                    <div className="authorName">
                        {complaint.complaint.author}<br/>
                        <span className="issueDate">{complaint.complaint.date}</span>
                    </div>

                    <div className="tagSection">
                        <h2>Tags</h2>
                        {
                            complaint.tags.map(function (tag)
                            {
                                return (
                                    <span className="tags">
                                        {tag}<br/>
                                    </span>
                                )
                            })
                        }
                    </div>

                    <div className="statusSection">
                        <h2>Status</h2>
                        {!isAdmin?findStatus(complaint.complaint.status):
                        <select name="status" id="statusEdit">
                            <option selected={complaint.complaint.status==0?true:false} value="Open">Open</option>
                            <option selected={complaint.complaint.status==1?true:false} value="Assigned">Assigned</option>
                            <option selected={complaint.complaint.status==2?true:false} value="Closed">Closed</option>
                      </select>
                        }
                    </div>
                    
                    <div className="ETASection">
                        <h2>ETA</h2>
                        {!isAdmin?complaint.complaint.eta:
                            <input type="text" id="etaEditer" value={complaint.complaint.eta}/>
                        }
                    </div>
                    
                    <div className="PrioritySection">
                        <h2>Priority</h2>
                        {!isAdmin?complaint.complaint.priority:
                        <select name="priorityEdit" id="priorityEdit">
                             <option selected={complaint.complaint.status==0?true:false} value="Low">Low</option>
                             <option selected={complaint.complaint.status==1?true:false} value="Medium">Medium</option>
                             <option selected={complaint.complaint.status==2?true:false} value="High">High</option>
                       </select>
                        }
                    </div>
                    
                    <div className="AssigneeSection">
                        <h2>Assignee</h2>
                        {!isAdmin?complaint.complaint.assignee:
                        <select name="admins" id="adminsAssign">
                            {admins.map(function(admin)
                            {
                                return <option selected={complaint.complaint.assignee==admin?true:false} value={admin}>{admin}</option>

                            })}
                            
                       </select>
                        }
                    </div>
                    {isAdmin?
                        <div className="complaintEditBtn">
                        <input type="button" value="Update" onClick={onUpdateClick}/>
                        </div>:''
                    }
                    


                </div>
            </div>
            }
        </div>
    )
}

export default DetailedView

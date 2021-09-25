import React, {useState, useEffect} from 'react'

const DetailedView = (props) => 
{
    
    const [complaint, setComplaintInfo] = useState({})


    function onComplaintInfoLoad(data)
    {
        setComplaintInfo(data)
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

    useEffect(() => 
    {
        fetch('http://localhost:5000/complaints/'+props.id)
    .then(response => response.json())
    .then(data => onComplaintInfoLoad(data));

    },[]);

    return (
        <div className="detailViewPageWrapper">
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
                            {complaint.complaint.votes}
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
                        {findStatus(complaint.complaint.status)}
                    </div>

                </div>
            </div>
            }
        </div>
    )
}

export default DetailedView

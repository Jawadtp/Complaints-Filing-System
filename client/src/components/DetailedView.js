import React, {useState, useEffect} from 'react'

const DetailedView = (props) => 
{
    
    const [complaint, setComplaintInfo] = useState({})


    function onComplaintInfoLoad(data)
    {
        setComplaintInfo(data)
        console.log(data.complaint)
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
                <div className="authorName">
                    Reported by: {complaint.complaint.author}
                  <span className="issueDate">{complaint.complaint.date}</span>
                </div>

                <div className="titleHeader">
                    Title
                </div>

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
            }
        </div>
    )
}

export default DetailedView

import React from 'react'
// import axios from 'axios'

const CreateIssue = () => 
{
    function postComplaint()
    {
        var tags = document.getElementById('tags').value.split(',')

        for(var i=0; i<tags.length; i++)
            tags[i]=tags[i].trim()

        const complaintToPost = 
        {
            'title': document.getElementById('title').value,
            'description': document.getElementById('desc').value,
            'priority': document.getElementById('cars').value,
            'author': document.getElementById('author').value,
            'tags': tags
        }

        console.log(complaintToPost)
        console.log(complaintToPost['tags'])


        fetch('http://localhost:5000/complaints', {
        method: 'POST',
        
        body: JSON.stringify(complaintToPost),
        })
        .then(response => response.json())
        .then(result => {
        console.log('Success:', result);
        })
        .catch(error => {
        console.error('Error:', error);
        });
      

        
    }

    return (
        <div className="issueForm">
            <div>
                <h1>
                    Create Issue
                </h1>
            </div>

            <div>
                <form>

                    <div className="author">
                        <label>Enter you roll number</label><br/>
                        <input type="text" id="author" placeholder="Roll no"></input>
                    </div>

                    <div className="summary">
                        <label>Issue summary</label><br/>
                        <input type="text" id="title" placeholder="Title"></input>
                    </div>

                    <div className="priority">
                        <label>Priority</label><br/>

                        <select id="cars" name="cars">
                            <option value="0">Low</option>
                            <option value="1">Medium</option>
                            <option value="2">High</option>
                        </select>
                    </div>
                    
                    <div className="description">
                        <label>Issue description</label><br/>
                        <textarea id="desc"></textarea>
                    </div>

                    <div className="tags">
                        <label>Enter tags (comma-separated)</label><br/>
                        <input type="text" id="tags" placeholder="Tags"></input>
                    </div>

        <input type="button" value="Cancel"/>
        <input type="button" value="Submit" onClick={postComplaint}/>

                    
                </form>
            </div>
        </div>
    )
}

export default CreateIssue

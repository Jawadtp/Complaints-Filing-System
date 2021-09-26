import React from 'react'
import { BiWindows } from 'react-icons/bi'

const CreateIssue = (props) => 
{
    function postComplaint()
    {

        var tags = ['tag1']

        const complaintToPost = 
        {
            'title': document.getElementById('title').value,
            'description': document.getElementById('desc').value,
            'priority': document.getElementById('priority').value,
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
        .then(result => 
            {
                window.location.reload()
                alert('Your complaint has been registered')
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
                    Register Issue
                </h1>
            </div>

            <div>
                <form>

                    <div className="author">
                        <label>Enter your roll number</label><br/>
                        <input type="text" id="author" placeholder="Roll no"></input>
                    </div>

                    <div className="summary">
                        <label>Issue summary</label><br/>
                        <input type="text" id="title" placeholder="Title"></input>
                    </div>

                    <div className="priority">
                        <label>Priority</label><br/>

                        <select id="priority">
                            <option value="0">Low</option>
                            <option value="1">Medium</option>
                            <option value="2">High</option>
                        </select>
                    </div>
                    
                    <div className="description">
                        <label>Issue description</label><br/>
                        <textarea id="desc"></textarea>
                    </div>

                    <div className="registerTags">

                        <div>Select tags: </div>
                        {
                            props.tags.map(function (tag){
                                return(
                                <div class="tag" id={tag}>
                                    <input type="checkbox" />
                                    <label>{tag}</label>
                                </div>
                            )
                            })
                        }
                        
                    </div>

                    <div>
                        <div className="issueFormSubmitButtons">
                            <input type="button" value="Cancel"/>
                        </div>
                        <div className="issueFormSubmitButtons">
                            <input type="button" value="Register Issue" onClick={postComplaint}/>
                        </div>
                    </div>
                    
                </form>
            </div>
        </div>
    )
}

export default CreateIssue

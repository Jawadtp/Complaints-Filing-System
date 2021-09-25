import React from 'react'

const CreateIssue = () => 
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

                    <div className="tags">

                        <div>Select tags: </div>

                        <div id="tag1">
                            <input type="checkbox" />
                            <label for="scales">Tag1</label>
                        </div>

                        <div id="tag2">
                            <input type="checkbox"/>
                            <label for="scales">Tag2</label>
                        </div>

                        <div id="tag3">
                            <input type="checkbox"/>
                            <label for="scales">Tag3</label>
                        </div>
                    </div>

                    <div>
                        <div className="issueFormSubmitButtons">
                            <input type="button" value="Cancel"/>
                        </div>
                        <div className="issueFormSubmitButtons">
                            <input type="button" value="Create Issue" onClick={postComplaint}/>
                        </div>
                    </div>
                    
                </form>
            </div>
        </div>
    )
}

export default CreateIssue

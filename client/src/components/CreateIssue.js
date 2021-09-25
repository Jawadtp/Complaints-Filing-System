import React from 'react'

const CreateIssue = () => 
{
    return (
        <div className="issueForm">
            <div>
                <h1>
                    Create Issue
                </h1>
            </div>

            <div>
                <form>
                    <div className="summary">
                        <label>Issue summary</label><br/>
                        <input type="text" placeholder="Title"></input>
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
                        <textarea></textarea>
                    </div>

                    <div>
                        <input type="submit" value="Create Issue"></input>
                        <input type="submit" value="Cancel"></input>
                    </div>

                    <div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateIssue

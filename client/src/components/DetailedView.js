import React from 'react'

const DetailedView = (props) => 
{
    fetch('http://localhost:5000/complaints/'+props.id)
    .then(response => response.json())
    .then(data => console.log(data));

    return (
        <div>
            Detailed view {props.id}
        </div>
    )
}

export default DetailedView

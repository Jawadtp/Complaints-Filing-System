function Cards(props) //A dictionary is passed in as a prop. Dictionary has details of the respective complaint.
{
   
    return(
        <div class="card">
            <p>{props.complaint['title']}</p>
            <p>Opened by: {props.complaint['name']}</p>

        </div>
    )
}

export default Cards
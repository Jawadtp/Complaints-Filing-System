function Cards(props) //A dictionary is passed in as a prop. Dictionary has details of the respective complaint.
{
   function onCardClick()
   {
       props.onCardClick(props.complaint['id'])
   }

    function setPriorityClass(priority){
        if(priority === 0){
            return 'low'
        }
        else if(priority === 1){
            return 'medium'
        }
        else{
            return 'high'
        }
    }
    return(
        <div class={`card ${setPriorityClass(props.complaint['priority'])}`} id={props.complaint['id']} onClick={onCardClick}>
            <p class='issueCardTitle' style={{fontWeight: 'bold'}}>{props.complaint['title']}</p>
            <p style={{margin: '0',fontSize:'.9rem',color: 'grey'}}>{props.complaint['rollno']}</p>
            <p style={{margin: '0 0 1rem 0',fontSize:'.9rem',color: 'grey'}}>{props.complaint['author']}</p>
        </div>
    )
}

export default Cards
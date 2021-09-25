function Cards(props) //A dictionary is passed in as a prop. Dictionary has details of the respective complaint.
{
   function onCardClick()
   {
       props.onCardClick(props.complaint['id'])
   }

    return(
        <div class="card" onClick={onCardClick}>
            <p>{props.complaint['title']}</p>
            <p>Opened by: {props.complaint['author']}</p>
        </div>
    )
}

export default Cards
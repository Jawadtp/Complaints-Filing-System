function Cards(props) //A dictionary is passed in as a prop. Dictionary has details of the respective complaint.
{
   function onCardClick()
   {
       props.onCardClick(props.complaint['id'])
   }

    return(
        <div class="card" onClick={onCardClick}>
            <p style={{fontWeight: 'bold'}}>{props.complaint['title']}</p>
            <p style={{fontSize:'.9rem',color: 'grey'}}>{props.complaint['author']}</p>
        </div>
    )
}

export default Cards
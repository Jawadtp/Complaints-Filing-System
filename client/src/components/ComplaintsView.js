import React, {useState, useEffect} from 'react'
import { icons } from 'react-icons/lib'
import ComplainsColumns from './ComplainsColumns'
import DetailedView from './DetailedView'
import Tag from './Tag'
const ComplaintsView = (props) => 
{

    const [detailedViewID, setDetailedViewID]=useState(-1)

    const [selectedTag, setSelectedTag]=useState('')
        
    useEffect(() => 
    {
    },[]);


    function onCardClick(id)
    {
        console.log(id)
        setDetailedViewID(id)
    }

    function onComplaintsByTagReceive(data)
    {
        console.log(data['tiles'])
        props.setComplaints(data['tiles'])
    }

    function onTagClick(id)
    {

        if(selectedTag===id)
        {
            console.log('deselecting tag')
            id=''
            setSelectedTag('')
        }
        console.log('Tag id: '+id)
        console.log('Fetching complaints by tag..')
        
        setSelectedTag(id)
        fetch('http://localhost:5000/complaints/'+id)
        .then(response => response.json())
        .then(data => onComplaintsByTagReceive(data));
    }

    return (
        <div className="complaintsViewWrapper">
            
            {console.log(props.tags)}
            {detailedViewID==-1?
            <>
            <div className="boardHome">board / home</div>
            <div className="complaints">Complaints</div>
            <input type='text' className="landingSearch" placeholder="Search.."/>

            <div className="tagRow">
                {
                    props.tags.map(function (tag) {
                    return(
                        <Tag tag={tag} onTagClick={onTagClick} selectedTag={selectedTag}/>
                    )
                })}
            </div>

            <div className="complaintsView">
            
                <ComplainsColumns status={0} complaints={props.complaints} onCardClick={onCardClick}/>            
                <ComplainsColumns status={1} complaints={props.complaints} onCardClick={onCardClick}/>               
                <ComplainsColumns status={2} complaints={props.complaints} onCardClick={onCardClick}/>            

            </div>
            </>:<DetailedView id={detailedViewID}/>}
        </div>
    )
        
    
        
    
    
}

export default ComplaintsView

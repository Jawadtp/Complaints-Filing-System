import React, {useState, useEffect} from 'react'
import { icons } from 'react-icons/lib'
import ComplainsColumns from './ComplainsColumns'
import DetailedView from './DetailedView'

const ComplaintsView = (props) => 
{

    const [detailedViewID, setDetailedViewID]=useState(-1)

    

    function onCardClick(id)
    {
        console.log(id)
        setDetailedViewID(id)
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
                        <div className="tags" id={tag}>
                            {tag}
                        </div>
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

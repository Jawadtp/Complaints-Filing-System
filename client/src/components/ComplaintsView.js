import React, {useState} from 'react'
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
            {detailedViewID==-1?
            <>
            <div className="boardHome">board / home</div>
            <div className="complaints">Complaints</div>
            <input type='text' className="landingSearch" placeholder="Search.."/>

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

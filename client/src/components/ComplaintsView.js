import React from 'react'
import Cards from './Card'
import ComplainsColumns from './ComplainsColumns'

const ComplaintsView = (props) => 
{

    return (
    <>
        <div className="boardHome">board / home</div>
        <div className="complaints">Complaints</div>
        <input type='text' className="landingSearch" placeholder="Search.."/>

        <div className="complaintsView">
            <ComplainsColumns status={0} complaints={props.complaints}/>            
            <ComplainsColumns status={1} complaints={props.complaints}/>               
            <ComplainsColumns status={2} complaints={props.complaints}/>               

        </div>
    </>
    )
}

export default ComplaintsView

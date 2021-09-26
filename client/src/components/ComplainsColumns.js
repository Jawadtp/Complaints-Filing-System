import React from 'react'
import Cards from './Card'
import {FaRegDotCircle,FaRegCheckCircle,FaRegArrowAltCircleUp} from 'react-icons/fa'

const ComplainsColumns = (props) => {  //This generates each of the three columns. Props passes are status (0, 1 or 2) and the list of all complaints (list of dictionaries)
    const statusName = props.status==0?'Open':props.status==1?'Assigned':'Closed'
    const statusClassName = statusName+'ComplaintsTitle'
    return (
        <div className={`col col${props.status}`}>
            
                <div className={`${statusName+'ComplaintsTitle'} complaintsTitle`}>
                    {props.status==0?<span><FaRegDotCircle />Open</span>:props.status==1?<span><FaRegArrowAltCircleUp />Assigned</span>:<span><FaRegCheckCircle />Closed</span>}
                </div>
                
                {
                    props.complaints.map(function (complaint)
                    {
                        return complaint['status']==props.status?<Cards complaint={complaint} onCardClick={props.onCardClick} />:''
                    })
                }
                
            </div>
    )
}

export default ComplainsColumns

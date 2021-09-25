import React from 'react'

const ComplaintsView = () => {
    return (
    <>
        <div className="boardHome">board / home</div>
        <div className="complaints">Complaints</div>
        <input type='text' className="landingSearch" placeholder="Search.."/>

        <div className="complaintsView">
            <div className="col col1">
                Cards come here
            </div>
            <div className="col col2">
                Cards come here
            </div>
            <div className="col col3">
                Cards come here
            </div>
        </div>
    </>
    )
}

export default ComplaintsView

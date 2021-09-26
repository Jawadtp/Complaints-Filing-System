import React from 'react'

const Tag = (props) => {
    return (
        <div className="tags" id={props.tag} onClick={onTagClick()}>
            {props.tag}
        </div>
    )
}

export default Tag

import React from 'react'

const Tag = (props) => 
{
    function onTagClick()
    {
        props.onTagClick(props.tag)
    }
    return (
        <div className={`tags ${props.tag==props.selectedTag?'selected':''}`} id={props.tag} onClick={onTagClick}>
            {props.tag}
        </div>
    )
}

export default Tag

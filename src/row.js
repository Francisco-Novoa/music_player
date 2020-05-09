import React from "react"

export default function Row(props){
    const handleClick=()=>{
        props.setSong("https://assets.breatheco.de/apis/sound/"+props.elem.url)
        props.setCurrentSong(props.i)
    }
    return(
        <>
        {   props.currentSong===props.i?     
        <button className="list-group-item list-group-item-action list-group-item-dark bg-dark text-white"
        onClick={()=>{handleClick()}}
        >
            <span >{props.elem.name}</span>
        </button>
        :
        <button className="list-group-item list-group-item-action list-group-item-dark"
        onClick={()=>{handleClick()}}
        >
            <span >{props.elem.name}</span>
        </button>
        }
        </>
    )
}
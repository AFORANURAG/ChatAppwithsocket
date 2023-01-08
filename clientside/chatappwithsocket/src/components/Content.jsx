import React from 'react'

export default function Content({content,time,name,username}) {
  console.log(name==username)
  return (
    <div  >
    <h3 className={name===username?"lefty":"righty"} >{content} </h3>
 <p  className={name===username?"lefty":"righty"}  style={{fontSize:"10px"}}>{name} <span  style={{fontSize:"7px"}}>{time}</span>  </p>
    </div>
  )
}

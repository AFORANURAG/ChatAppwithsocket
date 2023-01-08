import React from 'react'
import { Container } from '@chakra-ui/react'
import { Input,Box} from '@chakra-ui/react'
import { useState } from 'react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { useRef } from 'react'
import Content from "./Content"
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from 'react'



export default function Chatbox({socket,name,room}) {

const [message,setMessage]=useState("")

const [content,setContent]=useState([{message:"",key:uuidv4(),time:new Date(Date.now()).getHours()+":"+new Date(Date.now()).getHours(),name:name}])
// const messagecontent=useRef()

async function sendMessage (){

console.log("message sent")
// console.log(message,room)
if(message!==""){
  const messageData={
    room:room,
    author:name,
    message:message,
    time:new Date(Date.now()).getHours()+":"+new Date(Date.now()).getHours(),
  }
  await socket.emit("send_message",messageData)
  
}
setContent((prevcontent)=>{
  return [...prevcontent,{message:message,key:uuidv4(),time:new Date(Date.now()).getHours()+":"+new Date(Date.now()).getHours(),name:name}]
})


}
useEffect(()=>{
socket.on("receive_message",(data)=>{
 setContent((prevcontent)=>{
  return [...prevcontent,{message:data.message,key:uuidv4(),time:new Date(Date.now()).getHours()+":"+new Date(Date.now()).getHours(),name:data.author}]
 }) 

})
},[socket])


  return (
<Box width={"1000px"}>

<Container border={"1px solid black"} padding={"10"} maxW='800px'  mt={10} height={'auto'}   boxShadow='base' p='6' rounded='md' bg='white' >
<h2 style={{marginBottom:"20px"}}> Messages</h2>
  
<Container  >
 
{content.map((cont)=>{
    return <Content content={cont.message} time={cont.time} name={cont.name} key={cont.key} username={name}/>
     })}
     
  
  </Container>  

   </Container>

   <Input value={message}  onChange={(e)=>{
    setMessage(e.target.value)
  e.target.value=null
  }} placeholder='message' mt={5} ml={60} w={"540px"} />

   <Button mt={5} display={"block"} ml={"440px"} backgroundColor={"black"} color={"white"} onClick={sendMessage}> Send Message </Button>
</Box>
   
  )
}

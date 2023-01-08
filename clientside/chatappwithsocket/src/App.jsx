import { useState } from 'react'

import * as React from 'react'
import { Button, ButtonGroup, Heading } from '@chakra-ui/react'
// 1. import `ChakraProvider` component
import { ChakraProvider } from '@chakra-ui/react'
import Chatbox from './components/Chatbox'

import { Container } from '@chakra-ui/react'
import { Input,Box} from '@chakra-ui/react'

import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";

 
const socket=io.connect("http://localhost:8080")
function App() {
  const [name,setName]=useState("")

  const [chat,showChat]=useState(false)

  const [room,setRoom]=useState("")

  function joinRoom(){

    if(name!==""&&room!==""){
      socket.emit("join_room",room)
      console.log("joined to room") 
  showChat(!chat)
  }
      
  }



  // 2. Wrap ChakraProvider at the root of your app
  return (
    <ChakraProvider>
   
 { !chat? (

        <><Input value={name} onChange={(e) => { setName(e.target.value) } } placeholder='name...' mt={5} ml={"240px"} w={"540px"} /><Input ml={"240px"} value={room} onChange={(e) => { setRoom(e.target.value) } } placeholder='Join Room' mt={5} w={"540px"} /><Button mt={5} display={"block"} ml={"440px"} backgroundColor={"black"} color={"white"} onClick={joinRoom}> Join Room </Button></>

):(

    <><Heading ml={"400"}>Lets Chat</Heading><Chatbox socket={socket} name={name} room={room} /></>
 )

}
    </ChakraProvider>
  )
}


export default App

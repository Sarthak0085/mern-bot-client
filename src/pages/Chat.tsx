import { Avatar, Box, Button, IconButton, Typography } from '@mui/material'
import { useAuth } from '../context/AuthContext'
import { red } from '@mui/material/colors';
import ChatItem from '../components/chat/ChatItem';
import { IoMdSend } from 'react-icons/io';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { deleteUserChats, getUserChats, sendChatRequest } from '../helpers/api-communicator';
import { useNavigate } from 'react-router-dom';


// const chatMessages = [
//   {
//     "role": "user",
//     "content": "HOw are you?"
//   },
//   {
//     "role": "assistant",
//     "content": "I am fine good day to you sir?"
//   },
//   {
//     "role": "user",
//     "content": "HOw are you?"
//   },
//   {
//     "role": "assistant",
//     "content": "I am fine good day to you sir?"
//   },
//   {
//     "role": "user",
//     "content": "HOw are you?"
//   },
//   {
//     "role": "assistant",
//     "content": "I am fine good day to you sir?"
//   },
//   {
//     "role": "user",
//     "content": "HOw are you?"
//   },
//   {
//     "role": "assistant",
//     "content": "I am fine good day to you sir?"
//   }
// ]

type Message = {
  role: "user" | "assistant";
  content: string;
}

const Chat = () => {

  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const auth = useAuth();

  const [chatMessages, setChatMessages] = useState<Message[]>([]);

  const handleSubmit = async () => {

    const content = inputRef.current?.value as string;
    console.log(content);
    
    if (inputRef && inputRef.current) {
      inputRef.current.value = "";
    }

    const newMessages: Message = { role: "user", content };

    setChatMessages((prev) => [...prev, newMessages]);

    const chatData = await sendChatRequest(content);
    setChatMessages([...chatData.chats]);
    setTimeout(function() {
      scrollToBottom();
    }, 1000)
  }

  const handleDeleteChats = async () => {
    try {
      toast.loading("Deleting Chats", { id: "deletechats" });
      const data = await deleteUserChats();
      setChatMessages([]);
      toast.success(data.message, {id:"deletechats"})
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message, { id: "deletechats" });
    }
  }

  const scrollToBottom = () => {
    const chatContainer: HTMLElement | null = document.getElementById('chat-container');

  if (chatContainer) {
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }
  };

  useLayoutEffect(() => {
    if (auth?.isLoggedIn && auth?.user) {
      toast.loading("Loading Chats", { id: "loadchats" });
      getUserChats().then((data) => {
        setChatMessages([...data.chats]);
        toast.success("Successfully loaded chats", {id: "loadchats"})
      }).catch((error) => {
        console.log(error);
        toast.error(error.response?.data?.message, { id: "loadchats" });
      })
    }
  },[auth])

  useEffect(() => {
    if (!auth?.user) {
      return navigate("/login");
    }
  }, [auth])
  
  console.log(auth);
  

  return (
    <Box sx={{
      display: "flex",
      flex: 1,
      width: "100%",
      height: "100%",
      mt: 3,
      mb:1,
      gap: 3,
    }}>
      <Box sx={{
        display: { md: "flex", xs: 'none', sm: "none" },
        flex: 0.2,
        flexDirection: "column",
      }}>
        <Box sx={{
          display: "flex",
          width: "100%",
          height: "60vh",
          bgcolor: "rgb(17, 27, 39)",
          borderRadius: 3,
          flexDirection:"column",
          mx: 3,
          gap:2
        }}>
          <Avatar sx={{
            mx: "auto",
            my: 2,
            bgcolor: "white",
            color: "black",
            fontWeight: 700,
          }}>
            {auth?.user?.name[0]}
            {auth?.user?.name.split(" ")[1][0]}
          </Avatar>
          <Typography sx={{
            textAlign:'center',
            mx: "auto",
            fontFamily:"work sans"
          }}>
            What is the Mern-Bot?
          </Typography>
          <Typography
            sx={{ px: "12px"}}
          >
            MernBot is similar like chatgpt AI which can answer your questions related to education , business, fashion , history or any field.
            MernBot is formed using the gpt-3.5-turbo
            But avoid sharing your personal infomation that is important
          </Typography>
          <Button sx={{
            width: "200px",
            mx: "auto",
            my: "auto",
            color: "white",
            fontWeight: 700,
            borderRadius: 3,
            bgcolor: red[300],
            ":hover": {
              bgcolor: red[400],
            }
          }}
          onClick={handleDeleteChats}
          >
            clear conversation
          </Button>
        </Box>
      </Box>
      <Box sx={{
        display: "flex",
        flex: {
          md: 0.8,
          xs: 1,
          sm: 1,
        },
        flexDirection: "column",
        px: 3,
      }}>
        <Typography sx={{
          textAlign: "center",
          fontSize: "40px",
          color: "white",
          mb: 2,
        }}>
          Model GPT-3.5 Turbo
        </Typography>
        <Box
          id="chat-container"
          sx={{
          width: "80%",
          height: "60vh",
          borderRadius: 3,
          mx: "auto",
          display: "flex",
          flexDirection: "column",
          overflowY:"auto",
          scrollBehavior: "smooth",
        }}>
          {chatMessages.map((chat, index) => (
            <ChatItem key={index} content={chat.content} role={chat.role} scroll={scrollToBottom} />
          ))}
        </Box>
        <div style={{
          width: "78%",
          padding: "20px",
          borderRadius: 8,
          backgroundColor: "rgb(17,27,39)",
          display: "flex",
          margin:"auto"
        }}>
          <input
            ref={inputRef}
            onKeyUp={(e)=>{if(e.keyCode === 13) handleSubmit()}}
            type='text'
            style={{
              width: "100%",
              padding: "10px",
              border: "none",
              outline: "none",
              backgroundColor: "transparent",
              color: "white",
              fontSize: "20px",
            }}
          />
          <IconButton
            onClick={handleSubmit}
            onKeyDown={handleSubmit}
            sx={{
            color: "white",
            ml:"auto",
          }}>
            <IoMdSend />
          </IconButton>
        </div>
      </Box>
    </Box>
  )
}

export default Chat
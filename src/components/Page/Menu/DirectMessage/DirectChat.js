import {useLocation, useNavigate, useParams} from "react-router";
import InputEmoji from "react-input-emoji";
import React, {useCallback, useEffect, useRef, useState} from "react";
import "./_DirectMessage.scss";
import {useDispatch, useSelector} from "react-redux";
import {getChatContents} from "../../../../redux/socket/socket";
import {chatSocket} from "../../../../common/socket";
import {none_profile} from "../../../../common/IconImage";
import {Link} from "react-router-dom";



const DirectChat = () => {
  const {Room} = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();


  const [chatDirect, SetChatDirect] = useState("");
  const [chat, setChat] = useState([]);


  useEffect(() => {
    chatSocket.connect();
    chatSocket.emit("joinRoom", Room);
    console.log(chatSocket, location);
  }, [Room, location]);


  useEffect(() => {
    if(!Room){
      navigate(0);
    }else{
      dispatch(getChatContents({
        Room
      }))
    }
  }, [dispatch, Room, location])


  useEffect(() => {
    chatSocket?.on("newMessage", (payload) => {
      setChat((prev) => [...prev, payload]);
    });
  }, [chatSocket]);

  useEffect(() => {
    console.log(chat);
  }, [chat]);


  function ChatOnEnter(chatDirect) {
    chatSocket.emit("newMessage", chatDirect);
    setChat((prev) => [
      ...prev,
      {
        user: {userId: "나"},
        chatDirect,
      },
    ]);
    SetChatDirect("");
  }

  console.log(chat);

  const ChatClickHandler = (event) => {
    event.preventDefault();
    chatSocket.emit("newMessage", chatDirect);
    setChat((prev) => [
      ...prev,
      {
        user: {userId: "나"},
        chatDirect,
      },
    ]);
    SetChatDirect("");
  };

  const chat_list = useSelector(state=>state.socket.chatData);
  const my_info = useSelector(state=>state.user.user);



  //아래로 스크롤 내려가고 채팅 올라올 시 자동으로 스크롤 아래로 내려주기.
  const messagesEndRef = useRef(null);


  const scrollToBottom = () => {
    if(messagesEndRef && messagesEndRef.current){
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",});
    }
  };

  useEffect(scrollToBottom, [chat, Room, location]);


  const beforeChatContents = () => {
    return chat_list.map((contents) => (
      <div>
        {(contents.user.userId === my_info.userId)?
          <div className="my_chatting">
            <div>{contents.message}</div>
          </div> :
          <div className="chatting" >
            <img src={contents.user.profileImage ? contents.user.profileImage
              : none_profile}/>
            <div>{contents.message}</div>
          </div>
        }
      </div>
    ))
  }


  const renderChat = () => {
    return chat.map((data, index) => (
      <div  key={index}>
        {(data.user.userId !== "나")?
          <div className="chatting">
            <img src={data.user.profileImage ? data.user.profileImage : none_profile}/>
            <div>{data.message}</div>
          </div> :
          <div className="my_chatting">
          <div>{data.chatDirect}</div>
          </div>
        }

      </div>
    ));
  };


  //참가자 확인하기
  const participant_list = useSelector(state=> state.socket.participant);


  const Participant = () => {
    return(
      <>
        {participant_list.map((user) => (
          <Link to={`/profile/${user.userId}/posts`}>
          <div className="participant_user">
            <div> <img src={user.profileImage? user.profileImage : none_profile} alt="profile_image"/></div>
          <div>{user.userId}</div>
          </div>
          </Link>
        ))}
      </>
    )
  }


  return (
    <>
      <div className="direct_chat">
        <div className="direct_user_info">
          {Participant()}
        </div>
        <div className="direct_room">
          {beforeChatContents()}
          {renderChat()}
          <div ref={messagesEndRef}/>
        </div>
        <div className="direct_input">

          <InputEmoji
            borderColor="white"
            placeholder="채팅을 입력하세요"
            fontSize="14"
            value={chatDirect}
            onChange={SetChatDirect}
            cleanOnEnter
            onEnter={ChatOnEnter}/>
          {chatDirect && <button className="direct_button" onClick={ChatClickHandler}>보내기</button>}

        </div>
      </div>
    </>
  )
}

export default DirectChat;
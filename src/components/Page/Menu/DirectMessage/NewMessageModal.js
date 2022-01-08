import "../../../../common/_modalStyle.scss";
import React, {useEffect, useState} from "react";
import {x_img} from "../../../../common/IconImage";
import MessageModalCard from "./MessageModalCard";
import {headerSearch} from "../../../../redux/search/search";
import {useDispatch, useSelector} from "react-redux";
import CheckUser from "./CheckUser";
import {useNavigate} from "react-router";
import {nanoid} from "nanoid";
import {createRoomDB, getRoomListDB} from "../../../../redux/socket/socket";

const NewMessageModal = ({SetNewMessage , SetNewMessages}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();



  const user_list = useSelector(state=>state.search.user);


  //검색어 입력
  const [searchUser, SetSearchUser] = useState();
  const searchUserOnChange = (e) => {
    SetSearchUser(e.target.value);
  }



  const CancellationClickHandler = () => {
    if(SetNewMessage){
      SetNewMessage(false);
      navigate(0);
    }else {
      SetNewMessages(false);
      navigate(0);
    }
  }

  const [check, SetCheck] = useState(false);
  //엔터로 검색
  const searchEnter = (e) =>{
    if(e.key==='Enter'){
      const path = "directSearch"
      dispatch(headerSearch({
        searchResult : searchUser,
      }))

    }
  }

  const check_user = useSelector(state=>state.socket.userList);

  const createRoomClickHandler = () => {
    const RoomId = nanoid();
    dispatch(createRoomDB({
      RoomId,
      check_user,
    }))
  }



  return(
    <>
      <div className="new_message">
        <div className="new_message_header">
          <img src={x_img} alt="cancle" onClick={CancellationClickHandler}/>
          <a>새로운 메시지</a>
          <a className="message_next" onClick={createRoomClickHandler}>다음</a>
        </div>
        <div className="message_search">
          <div>받는 사람:
            <div className="check_user">
              {check_user && check_user.map((user) => (
              <CheckUser userId={user.userId} _id={user._id} />
            ))}

          </div>
          </div>
          <div>
            <label>
              <input placeholder="검색..." onKeyPress={searchEnter} onChange={searchUserOnChange}/>
            </label>
          </div>
        </div>
        <div className="message_recommend">
          <div className="message_card">
            {user_list && user_list.map((user) => (
              <MessageModalCard _id={user._id} name={user.name} userId={user.userId} profileImage={user.profileImage}
                                SetCheck={SetCheck} />
            ))}

          </div>
        </div>
      </div>
      <div className="overlay" onClick={CancellationClickHandler}/>
    </>
  )
}

export default NewMessageModal;
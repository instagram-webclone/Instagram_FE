import {my_message} from "../../../../common/IconImage";
import NewMessageModal from "./NewMessageModal";
import "./_DirectMessage.scss";


const NewMessage = ({SetNewMessage, newMessage}) => {

  const sendMessageClickHandler = () => {
    SetNewMessage(true);
  }


  return (
    <>
      <div className="main_direct">
        <div>
          <img src={my_message}/>
        </div>
        <div>내 메세지</div>
        <div>친구나 그룹에 비공개 사진과 메시지를 보내보세요.</div>
        <button onClick={sendMessageClickHandler}>메시지 보내기</button>
      </div>
    </>
  )
}
export default NewMessage;
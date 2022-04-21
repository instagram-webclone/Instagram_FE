import {useDispatch} from "react-redux";
import {deleteComment} from '../../../redux/post/comment';
import "./PostDetailCommentModal.scss";

const PostDetailCommentModal = ({postId, commentId, setOpenModal, Id, myId, writer}) => {
  const dispatch = useDispatch();
  const AccessToken = localStorage.getItem("user");

  const cancleClickHandler = () => {
    setOpenModal(false);
  };

  const deleteClickHandler = () => {
    dispatch(
      deleteComment({
        postId,
        commentId,
        AccessToken,
        Id,
      }))
    cancleClickHandler();
  };

  return (
    <>
      <div className='profile_modal_container'>
        {myId === writer ? (
          <div className='postDetailComment_modal_modal'>
            <div>신고</div>
            <div onClick={deleteClickHandler}>삭제</div>
            <div onClick={cancleClickHandler}>취소</div>
          </div>
        ) : (
          <div className='postDetailComment_others_modal'>
            <div>신고</div>
            <div onClick={cancleClickHandler}>취소</div>
          </div>
        )}
      </div>
      <div className='postDetailComment_modal_overlay' onClick={cancleClickHandler}/>
    </>
  );
};

export default PostDetailCommentModal;
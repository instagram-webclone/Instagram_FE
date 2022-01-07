import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router';

import PostDetailReplyCommentModal from './PostDetailReplyCommentModal';
import { likedReplyComment } from '../../../redux/post/comment';
import {comment_heart, comment_red_heart} from "../../../common/IconImage";

// postDetail과 css공유
import {none_profile} from "../../../common/IconImage";
import { BiDotsHorizontalRounded } from "react-icons/bi";



const PostReplyComment = ({Recontents, RecreatedAt, ReIsLike, Relike, Rewriter, ReCommentId, postId, Id, ReprofileImage}) => {  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // modal
  const [openModal, setOpenModal] = useState(false); 
  const show_postModal = () => {
		setOpenModal(true);
	};

  // 댓글 좋아요
  const AccessToken = localStorage.getItem("user");
  const LikedReplyCommentHandler = () => {
    dispatch(
      likedReplyComment({
        commentId: ReCommentId,
        AccessToken,
        Id,
      }));
  };

  //등록한 프로필 사진이 있는 경우와 없는 경우 구분.
	const user_img = ReprofileImage? ReprofileImage : none_profile;

    //유저 정보 프로필 클릭해서 들어가기
	const UserProfileClickHandler = () => {
    const id = Rewriter;
    navigate(`/profile/${id}/posts`,{state: id});
	}

  //글쓴 시간 계산. ex) 방금전, 몇분전 으로 표시하기 위해 사용함.
  function displayTime(value) {
    const today = new Date();
    const nowTime = new Date(value);

    const displayTime = Math.floor(
      (today.getTime() - nowTime.getTime()) / 1000 / 60,
    );
    if (displayTime < 1) return "방금전";
    if (displayTime < 60) {
      return `${displayTime}분전`;
    }

    const displayTimeHour = Math.floor(displayTime / 60);
    if (displayTimeHour < 24) {
      return `${displayTimeHour}시간전`;
    }

    const displayTimeDay = Math.floor(displayTime / 60 / 24);
    if (displayTimeDay < 365) {
      return `${displayTimeDay}일전`;
    }

    return `${Math.floor(displayTimeDay / 365)}년전`;
  }

  const time = displayTime(RecreatedAt);

  // 삭제, 신고버튼 mouseOver 
  const [showModal, setShowModal] = useState(false)
  const handleMouseEnter = e => {
    setShowModal(true)
  }
  const handleMouseLeave = e => {
    setShowModal(false)
  }
  
  return(
  <>
  {openModal && <PostDetailReplyCommentModal Id={Id} setOpenModal={setOpenModal} Recontents={Recontents} postId={postId} RecommentId={ReCommentId}/>}
  <div>
    {Recontents &&
    <div className="postDetail_replyComments"
      onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="postDetail_replyComment_pp">
        <img src={user_img} alt="pp" />
      </div>
      <div className="postDetail_replyComments_comment">
        <div className="postDetail_replyComment_userId">
          <span onClick={UserProfileClickHandler}>{Rewriter}</span>
          <span className="postDetail_replyComment_contents">
            {Recontents}
          </span>
        </div>
        <div className="postDetail_replyComment_info">
          <span>{time}</span>
          <span>
            좋아요
            <span>{Relike}</span>개
          </span>
          {showModal &&
          <span onClick={show_postModal}><BiDotsHorizontalRounded size={15} lineHeight={10}/></span>}
        </div>
      </div>
      <div className="postDetail_Reply_liked">
        {ReIsLike ? (
          <img
            src={comment_red_heart}
            onClick={LikedReplyCommentHandler}
            alt="comment_red_heart"
          />
        ) : (
          <img
            src={comment_heart}
            onClick={LikedReplyCommentHandler}
            alt="comment_heart"
          />
        )}
      </div>
    </div>
    }
  </div>
  </>
  )
}

export default PostReplyComment;
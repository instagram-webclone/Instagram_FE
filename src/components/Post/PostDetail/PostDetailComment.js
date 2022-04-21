import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router';

import {likedComment } from '../../../redux/post/comment';
import { replyReducer } from '../../../redux/post/postSlice';
import PostReplyComment from './PostReplyComment';

import "../../../common/_commentList.scss";
import {none_profile} from "../../../common/IconImage";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import {comment_heart, comment_red_heart} from "../../../common/IconImage";

// modal
import PostDetailCommentModal from "./PostDetailCommentModal";
import PostDetailLikeModal from '../PostDetail/PostDetailLikeModal';

const PostDetailComment = ({postId, commentId, contents, date, isLike, likeCount, writer, childComments, profileImage, myId}) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // modal
  const [openModal, setOpenModal] = useState(false); 
  const show_postModal = () => {
		setOpenModal(true);
	};

  // 댓글 좋아요
  const AccessToken = localStorage.getItem("user");
  const path = "detailCmt"
  const LikedCommentHandler = () => {
    dispatch(
      likedComment({
        commentId,
        AccessToken,
        path,
      }));
  };

  // 답글 달기
  const replyHandler = () => {
    const replyInfo = {writer: writer, commentId: commentId}
    dispatch(replyReducer(replyInfo));
  }

  // 대댓글 달기
  const [clickReply, setClickReply] = useState(false);
  const ReplyClickHandler = () => {
    setClickReply(!clickReply);
  }

  //등록한 프로필 사진이 있는 경우와 없는 경우 구분.
	const user_img = profileImage? profileImage : none_profile;

   //유저 정보 프로필 클릭해서 들어가기
	const UserProfileClickHandler = () => {
    const id = writer;
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

	const time = displayTime(date);

  // 삭제버튼 mouseOver 
  const [showModal, setShowModal] = useState(false)
  const handleMouseEnter = () => {
    setShowModal(true)
  }
  const handleMouseLeave = () => {
    setShowModal(false)
  }

  //좋아요 리스트 모달
  const [likeOpen, SetLikeOpen] = useState(false);
  const likeListClickHandler = () => {
    // dispatch(likeList_modal());
    SetLikeOpen(true)
  }

  return(
    <>
    {likeOpen && <PostDetailLikeModal AccessToken={AccessToken} SetLikeOpen={SetLikeOpen} commentId={commentId} />}
    {openModal && <PostDetailCommentModal  setOpenModal={setOpenModal} contents={contents} postId={postId} commentId={commentId} myId={myId} writer={writer}/>}
    
    <div className="postDetail_comments" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
    <div className="postDetail_comment_pp">
      <img src={user_img} alt="user_img"/>
    </div>
    <div className="postDetail_comments_comment">
      <div>
      <div className="postDetail_comment_userId">
        <span onClick={UserProfileClickHandler}>{writer}</span>
        <span className="postDetail_comment_contents">
          {contents}
        </span>
      </div>
      <div className="postDetail_commentList_liked">
      {isLike ? (
        <img
          src={comment_red_heart}
          onClick={LikedCommentHandler}
          alt="comment_red_heart"
        />
      ) : (
        <img
          src={comment_heart}
          onClick={LikedCommentHandler}
          alt="comment_heart"
        />
      )}
    </div>
    </div>
      <div className="postDetail_comment_info">
        <span>{time}</span>
        <span onClick={likeListClickHandler}>
          좋아요
          <span>{likeCount}</span>개
        </span>
        <span onClick={replyHandler}>답글 달기</span>
        {showModal && <span className="postDetail_comment_info_modal" onClick={show_postModal}><BiDotsHorizontalRounded size={15}/></span>}
          
      </div>
      {clickReply ?
      (<div className="postDetail_replyCommentsBox">
        <div className="postDetail_replycomment_hidden">
          <span  onClick={ReplyClickHandler}> ㅡㅡ 답글 숨기기 </span>
        {childComments && childComments.map((reply, idx) => (
        <PostReplyComment key={idx}
        Recontents={reply.contents} RecreatedAt={reply.createdAt} Relike={reply.likeCount} ReIsLike={reply.isLike}
        Rewriter={reply.writer.userId} ReCommentId={reply._id} postId={postId} Id={commentId} ReprofileImage={reply.writer.profileImage}
        />
      ))}
        </div>
      </div>
      ) : (
      <div  onClick={ReplyClickHandler}>
        {childComments && childComments.length > 0 && (
          <div className="postDetail_replycomment"> ㅡㅡ 답글보기 (<span>{childComments.length}</span>개)</div>
        )}
      </div>)}
    </div>
    </div>
  </>
  )
}

export default PostDetailComment;
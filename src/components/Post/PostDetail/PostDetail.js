import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useNavigate, useParams } from "react-router";
import { history } from '../../../history';

import {getPostDetail, likePost, savedPost} from "../../../redux/post/post";
import PostDetailComment from './PostDetailComment';
import PostComment from '../PostCard/PostComment';
import { loading, replyReducer } from '../../../redux/post/postSlice';

// modal
import PostOptionModal from './PostOptionModal';

// css
import "./PostDetail.scss";
import { BiDotsHorizontalRounded, BiX, BiPlusCircle } from "react-icons/bi";
import {post_red_heart, post_heart, message, text, post_save, post_saveActive, none_profile} from "../../../common/IconImage";
import PostBookmarkToast from '../PostModal/PostBookmarkToast';

const PostDetail = () => {	

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const {postId} = useParams();

	// main이랑 path로 action 구분
	const path = "postDetail";

	const postDetail = useSelector((state) => state.post.postDetail[0]);
	const comments = useSelector((state) => state.post.comment);
	const myId = useSelector(state=>state.user.user.userId);

	const replyTag = useSelector((state) => state.post.replyTag); 
	const replyUserId = useSelector(state => state.post.replyTag?.writer);
	const replyCommentId = useSelector(state => state.post.replyTag?.commentId);

	// 페이지네이션
	const [page, setPage] = useState(1);

	useEffect(() => {
		const pageSection = "fristPage";
		dispatch(loading(true));
    dispatch(getPostDetail({postId, page, pageSection}));
		setPage(page + 1);
  }, []);

	const paginationHandler = () => {
		const pageSection = "more";
		dispatch(loading(true));
    dispatch(getPostDetail({postId, page, pageSection}));
		setPage(page + 1);
	}
	
	// 포스트 좋아요
	const postLikeClickHandler = () => {
		const _id = postDetail.writer._id;

    dispatch(
      likePost({
        postId,
        path,
				_id,
      }))
  };

	//포스트 북마크
  const AccessToken = localStorage.getItem("user");
  const [bookmarkToast, setBookmarkToast] = useState(false);
	const savedPostHandler = () => { 
		dispatch( 
      savedPost({ 
        postId, 
        AccessToken, 
        path, 
      }) 
      );
			!postDetail.isPostSaved && setBookmarkToast(true);
    	setTimeout(() => setBookmarkToast(false), 4000);
    };

	// PostDetail 전체 modal
	const cancleClickHandler = () => {
		history.go(-1);
		if(replyTag) {
			dispatch(replyReducer(""))
		}
	};

	// PostDetail의 dot modal
  const [openModal, setOpenModal] = useState(false); 
  const show_postOptionModal = () => {
		setOpenModal(true);
	};
	
	 //유저 정보 프로필 클릭해서 들어가기
	const UserProfileClickHandler = () => {
		const id = postDetail.writer.userId
		navigate(`/profile/${id}/posts`,{state: id})
	}
	
	 //등록한 프로필 사진이 있는 경우와 없는 경우 구분.
	const profile_img = postDetail && postDetail.writer.profileImage;
	const user_img = profile_img? profile_img : none_profile;

	//글쓴 시간 계산. ex) 방금전, 몇분전 으로 표시하기 위해 사용함.
	function displayTime(value) {
		const today = new Date();
		const nowTime = new Date(value);

		const displayTime = Math.floor(
			(today.getTime() - nowTime.getTime()) / 1000 / 60,
		);
		if (displayTime < 1) return "방금 전";
		if (displayTime < 60) {
			return `${displayTime}분전`;
		}

		const displayTimeHour = Math.floor(displayTime / 60);
		if (displayTimeHour < 24) {
			return `${displayTimeHour}시간 전`;
		}

		const displayTimeDay = Math.floor(displayTime / 60 / 24);
		if (displayTimeDay < 365) {
			return `${displayTimeDay}일 전`;
		}
		return `${Math.floor(displayTimeDay / 365)}년 전`;
	}
	const times = postDetail && postDetail.createdAt;
	const time = displayTime(times);

	return (
		<>
			{openModal && <PostOptionModal postId={postId} myId={myId} writer={postDetail.writer.userId} setOpenModal={setOpenModal} />}
			{postDetail && comments && 
			<div className="postDetail_background">
				<div className="postDetail_overlay" onClick={cancleClickHandler}/>
				<div className="postDetail_exit"><BiX size={40} onClick={cancleClickHandler}/></div>
				<div className="postDetail_container" >
					<div className="postDetail_leftsideBox">
						<img src={postDetail.imageUrl} alt="postImg" />
					</div>
					<div className="postDetail_rightsideBox">
						<div className="postDetail_header">
							<div className="postDetail_header_pic">
									<img src={user_img} alt="pp" />
							</div>
							<div className="postDetail_header_userId">
								<span onClick={UserProfileClickHandler}>{postDetail.writer.userId}</span> * <span> 팔로잉</span>
							</div>
							<div className="postDetail_header_btn" onClick={show_postOptionModal}>
								<BiDotsHorizontalRounded size={25} />
							</div>
						</div>
						{/* main */}
						<div className="postDetail_main">						
							<div className="postDetail_comment_list"
							>
							{/* 댓글리스트 */}
								<div className="postDetail_comments">
									<div className="postDetail_comment_pp">
										<img src={user_img} alt="pp" />
									</div>
									<div className="postDetail_comments_mycomment">
										<div className="postDetail_comment_myUserId">
											<span onClick={UserProfileClickHandler}>{postDetail.writer.userId}</span>
											<span className="postDetail_comment_myContents">
												{postDetail.contents}
											</span>
										</div>
										<div className="postDetail_comment_myInfo">
											<span>{time}</span>
										</div>
									</div>
								</div>
									{comments && comments.map((comment, idx) => (
										<PostDetailComment key={idx} postId={postId} commentId={comment._id} contents = {comment.contents}
										writer={comment.writer.userId} isLike={comment.isLike} likeCount={comment.likeCount} date={comment.createdAt}
										childComments={comment.childComments} profileImage={comment.writer.profileImage} myId={myId}
										/>
									))}
									<div className="postDetail_commentMore">
										{(comments.length % 10 === 0) && (
											<button onClick={paginationHandler}><BiPlusCircle size={26}/></button>
										)}
									</div>
									<PostBookmarkToast postId={postId} bookmarkToast={bookmarkToast}/>
							</div>
						
						{/* bottom */}
							<div className="postDetail_bottom">
								<div className="postDetail_comment_funcs">
									<div className="postDetail_comment_Likefunc">
										{postDetail.isLike? (
											<img src={post_red_heart} onClick={postLikeClickHandler} alt="heart" />
										) : (
											<img src={post_heart} onClick={postLikeClickHandler} alt="heart" />
										)}
									</div>
									<div className="postDetail_comment_Commentfunc">
										<img src={text} alt="text" />
									</div>
									<div className="postDetail_comment_Replyfunc">
										<img src={message} alt="message" />
									</div>
									<div className="postDetail_comment_Bookmarkfunc">
										{postDetail.isPostSaved ? (
											<img className="post_saveActive"
												src={post_saveActive}
												onClick={savedPostHandler}
												alt="post_save"
											/>
										) : (
											<img
												className="post_save"
												src={post_save}
												onClick={savedPostHandler}
												alt="post_save"
											/>
										)}
									</div>
								</div>
								<div className="postDetail_comment_likeList">
									{/* 팔로우 좋아요를 눌렀을 경우 */}
									{/* <div className="postDetail_likeList_pic">
										<img src={menu_profile} alt="menu_profile" />
									</div> */}
									<div className="postDetail_likeList_likeInfo">
										좋아요
										<span>{postDetail.likeCount}</span>개
									</div>
									{/* 팔로우 좋아요를 눌렀을 경우 */}
									{/* // <div className="postDetail_likeList_likeInfo">
									<span>testtest</span>님 <span>외 <span>{postDetail.likeCount}</span>명</span>이
									좋아합니다
									</div> */}
								</div>
								<div className="postDetail_comment_time">
									<span>{time}</span>
								</div>
								<div className="postDetail_postComment">
								<PostComment replyCommentId={replyCommentId} replyUserId={replyUserId} replyTag={replyTag} path={path} postId={postId} commentId={comments._id}/>
								</div>
							</div>
						</div>
					</div>
					</div>
				</div>
		}	
		</>
	);
};
export default PostDetail;
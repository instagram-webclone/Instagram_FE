import React, { useEffect, useRef, useState } from "react";
import PostCard from "../Post/PostCard/PostCard";
import SideMain from "./Side/SideMain";

import "./Main.scss";
import MainStory from "./MainStory/MainStory";
import { useDispatch, useSelector } from "react-redux";
import { getPost } from "../../redux/post/post";
import PostLikeModal from "../Post/PostModal/PostLikeModal";
import { loading } from "../../redux/post/postSlice";
const Main = () => {
  const dispatch = useDispatch();

  const user_recommend = useSelector((state) => state.post.recommendedUser);
  const post_data = useSelector((state) => state.post.posts);
  const isLoaded = useSelector((state) => state.post.isLoaded);
  const like_modal = useSelector((state) => state.modal.likeList_modal);

  // 무한 스크롤
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (post_data.length > 0) {
      return;
    } else {
      const pageSection = "fristPage";
      dispatch(loading(true));
      dispatch(getPost({page, pageSection}));
      setPage(page + 1);
    }
  }, []);

  const observerRef = useRef();

  const observer = (node) => {
    if (isLoaded) return;
    if (observerRef.current) observerRef.current.disconnect();
    observerRef.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        const pageSection = "more";
        dispatch(loading(true));
        dispatch(getPost({page, pageSection}));
        setPage((page) => page + 1);
      }
    });
    node && observerRef.current.observe(node);
  };

  return (
    <>
      <div className="container">
        <div className="Main">
          <div className="Main_post">
            <MainStory />
            {like_modal && <PostLikeModal />}
            {post_data &&
              post_data.map((post, index) => {
                return index === post_data.length - 2 &&
                  post_data.length % 7 === 0 ? (
                  <div ref={observer}>
                    <PostCard
                      key={index}
                      contents={post.contents}
                      createdAt={post.createdAt}
                      writer={post.writer}
                      postId={post._id}
                      postImage={post.imageUrl}
                      isLike={post.isLike}
                      likeCount={post.likeCount}
                      comments={post.comments}
                      commentIsAllowed={post.commentIsAllowed}
                      commentCount={post.commentCount}
                      isPostSaved={post.isPostSaved}
                    />
                  </div>
                ) : (
                  <div>
                    <PostCard
                      key={index}
                      contents={post.contents}
                      createdAt={post.createdAt}
                      writer={post.writer}
                      postId={post._id}
                      postImage={post.imageUrl}
                      isLike={post.isLike}
                      likeCount={post.likeCount}
                      comments={post.comments}
                      commentIsAllowed={post.commentIsAllowed}
                      commentCount={post.commentCount}
                      isPostSaved={post.isPostSaved}
                    />
                  </div>
                );
              })}
          </div>

          <div className="Main_side">
            <SideMain user_recommend={user_recommend} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;

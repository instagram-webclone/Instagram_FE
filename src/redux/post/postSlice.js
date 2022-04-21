import { createSlice } from "@reduxjs/toolkit";

import { deletePost, getLikeList, getPost, getPostDetail, getUserPost, savedPost, likePost, randomPost, } from "./post";
import { addComment, deleteComment, likedComment, addReplyComment, deleteReplyComment, likedReplyComment, getLikedListComment,} from "./comment";

const postSlice = createSlice({
  name: "post",
  initialState: {
    user: [],
    posts: [],
    postDetail: [],
    comment: {
      childComments: [],
    },
    likeUsers: [],
    likeUsersCmt: [],
    replyTag: "",
    randomPosts: [],
    post: [],
    profileSaved: "",
    recommendedUser: [],
    isLoaded: false,
  },
  reducers: {
    replyReducer: (state, action) => {
      state.replyTag = action.payload;
    },
    selectSaved: (state, action) => {
      state.profileSaved = action.payload;
    },
    loading: (state, action) => {
      state.isLoaded = action.payload;
    },
  },
  extraReducers: {
    [getPost.fulfilled]: (state, action) => {
      if (action.payload.pageSection === "fristPage") {
        state.posts = action.payload.data.posts;
        state.recommendedUser = action.payload.data.recommendedUser;
        state.isLoaded = false;
      } else {
        return {
          ...state,
          posts: [...state.posts, ...action.payload.data.posts],
          isLoaded: false,
        };
      }
    },
    [getUserPost.fulfilled]: (state, action) => {
      state.post = action.payload.post;
      state.user = action.payload.user;
      state.savedPost = action.payload.savedPost;
    },
    [deletePost.fulfilled]: (state, { payload }) => {
      const post_list = state.posts.filter((post) => post._id !== payload);
      state.posts = post_list;
    },
    [getPostDetail.fulfilled]: (state, action) => {
      if (action.payload.pageSection === "fristPage") {
        state.postDetail = action.payload.data.post;
        state.comment = action.payload.data.comment;
        state.isLoaded = false;
      } else {
          return{
            ...state,
            postDetail : [...state.postDetail, ...action.payload.data.post],
            comment : [...state.comment, ...action.payload.data.comment],
            isLoaded: false,
          }
      }
      
    },
    [savedPost.fulfilled]: (state, action) => {
      if (action.payload.path === "main") {
        const post = state.posts.findIndex(
          (p) => p._id === action.payload.postId
        );
        state.posts[post].isPostSaved = !state.posts[post].isPostSaved;
      } else {
        state.postDetail[0].isPostSaved = !state.postDetail[0].isPostSaved;
      }
    },
    [likePost.fulfilled]: (state, action) => {
      console.log(action);
      if (action.payload.path === "main") {
        const idx = state.posts.findIndex(
          (p) => p._id === action.payload.postId
        );
        if (!state.posts[idx].isLike) {
          state.posts[idx].isLike = true;
          state.posts[idx].likeCount = state.posts[idx].likeCount + 1;
        } else {
          state.posts[idx].isLike = false;
          state.posts[idx].likeCount = state.posts[idx].likeCount - 1;
        }
      } else {
        if (!state.postDetail[0].isLike) {
          state.postDetail[0].isLike = true;
          state.postDetail[0].likeCount = state.postDetail[0].likeCount + 1;
        } else {
          state.postDetail[0].isLike = false;
          state.postDetail[0].likeCount = state.postDetail[0].likeCount - 1;
        }
      }
    },

    //좋아요 리스트 목록 가져오기
    [getLikeList.fulfilled]: (state, action) => {
      state.likeUsers = action.payload.data.likeUsers;
    },

    // Comment
    [addComment.fulfilled]: (state, action) => {
      if (action.payload.path === "main") {
        const idx = state.posts.findIndex(
          (c) => c._id === action.payload.data.comment.postId
        );
        state.posts[idx].commentCount++;
        state.posts[idx].comments.unshift(action.payload.data.comment);
      } else {
        action.payload.data.comment.likeCount = 0;
        state.comment.push(action.payload.data.comment);
      }
    },
    [deleteComment.fulfilled]: (state, action) => {
      state.comment = state.comment.filter((cnt) => cnt._id !== action.payload);
    },
    [likedComment.fulfilled]: (state, action) => {
      console.log(action);
      if (action.payload.path === "detailCmt") {
        const idx = state.comment.findIndex(
          (c) => c._id === action.payload.commentId
        );
        if (!state.comment[idx].isLike) {
          state.comment[idx].isLike = true;
          state.comment[idx].likeCount = state.comment[idx].likeCount + 1;
        } else {
          state.comment[idx].isLike = false;
          state.comment[idx].likeCount = state.comment[idx].likeCount - 1;
        }
      } else {
        const post = state.posts.findIndex(
          (p) => p._id === action.payload.postId
        );
        console.log(post);
        const cmt = state.posts[post].comments.findIndex(
          (c) => c._id === action.payload.commentId
        );
        console.log(cmt);
        if (!state.posts[post].comments[cmt].isLike) {
          state.posts[post].comments[cmt].isLike = true;
        } else {
          state.posts[post].comments[cmt].isLike = false;
        }
        // state.posts[post].comments[cmt].isLike = !state.posts[post].comments[cmt].isLike;
      }
    },
    // 댓글, 대댓글 좋아요 리스트목록 보기
    [getLikedListComment.fulfilled]: (state, action) => {
      console.log(action);
      state.likeUsersCmt = action.payload.data.likeUsers;
    },

    //replyComment
    [addReplyComment.fulfilled]: (state, action) => {
      console.log(action);
      action.payload.data.reComment.likeCount = 0;
      const idx = state.comment.findIndex(
        (c) => c._id === action.payload.commentId
      );
      state.comment[idx].childComments.push(action.payload.data.reComment);
    },

    [deleteReplyComment.fulfilled]: (state, action) => {
      console.log(action);
      const idx = state.comment.findIndex((c) => c._id === action.meta.arg.Id);
      state.comment[idx].childComments = state.comment[
        idx
      ].childComments.filter((re) => re._id !== action.payload.commentId);
    },
    [likedReplyComment.fulfilled]: (state, action) => {
      console.log(action);
      const idx = state.comment.findIndex((c) => c._id === action.meta.arg.Id);
      const re = state.comment[idx].childComments.findIndex(
        (c) => c._id === action.payload.commentId
      );
      if (!state.comment[idx].childComments[re].isLike) {
        state.comment[idx].childComments[re].isLike = true;
        state.comment[idx].childComments[re].likeCount =
          state.comment[idx].childComments[re].likeCount + 1;
      } else {
        state.comment[idx].childComments[re].isLike = false;
        state.comment[idx].childComments[re].likeCount =
          state.comment[idx].childComments[re].likeCount - 1;
      }
    },
    [randomPost.fulfilled]: (state, action) => {
      state.randomPosts = action.payload.data.randomPost;
    },
  },
});
export const { loading, replyReducer } = postSlice.actions;

export default postSlice;

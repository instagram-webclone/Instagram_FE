import {createSlice} from "@reduxjs/toolkit";

import {deletePost, getLikeList, getPost, getPostDetail, getUserPost, savedPost} from "./post";
import { addComment, deleteComment, likedComment, addReplyComment, deleteReplyComment, likedReplyComment } from './comment';

const postSlice = createSlice({
  name: 'post',
  initialState: {
    user: [],
    posts: [],
    postDetail: [],
    comment: {
      childComments: [],
    },
    likeUsers:[],
    replyTag: "",
  },
  reducers: {
    replyReducer : (state, action) => {
      state.replyTag = action.payload;
    },
  },
  extraReducers: {
    [getPost.fulfilled]: (state, action) => {
      state.posts = action.payload.posts;
    },
    [getUserPost.fulfilled] : (state, action) => {
      console.log(action);
      state.post = action.payload.data.post;
      state.user = action.payload.data.user;
      state.savedPost = action.payload.data.savedPost;
    },
    [deletePost.fulfilled]: (state, {payload}) => {
     const post_list = state.posts.filter(
       post=> post._id !== payload );
     state.posts = post_list;
    },
    [getPostDetail.fulfilled]: (state, action) => {
      state.postDetail = action.payload.post;
      state.comment = action.payload.comment;
    },
    // [savedPost.fulfilled]: (state, action) => {
    //   const post = state.posts.findIndex((p) => p._id === action.meta.arg.postId);
    //   // const detail = state.postDetail.findIndex((d) => d._id === action.meta.arg.postId);
    //   console.log(action.meta.arg.postId);
    //   console.log(post);
    //   // state.posts[post].isPostSaved = !state.posts[post].isPostSaved;
    //   // state.postDetail[detail].isPostSaved = !state.postDetail[detail].isPostSaved;
    // },
    [savedPost.fulfilled]: (state, action) => { 
      if (action.payload.path === "main") { 
        const post = state.posts.findIndex( (p) => p._id === action.payload.postId ); 
        state.posts[post].isPostSaved = !state.posts[post].isPostSaved; 
      } else { 
        state.postDetail[0].isPostSaved = !state.postDetail[0].isPostSaved; 
      } 
    },

    //comment
    [addComment.fulfilled] : (state, action) => {
      // const idx = state.posts.filter(post=> post._id !== action.meta.arg.postId);
      // state.posts[idx].comments.push(action.payload.comment);
      state.comment.push(action.payload.comment);
    },
    [deleteComment.fulfilled]: (state, action) => {			
			state.comment = state.comment.filter(
				(cnt) => cnt._id !== action.payload );
		 },
     [likedComment.fulfilled]: (state, action) => {
       const idx = state.comment.findIndex((c) => c._id === action.meta.arg.commentId);
       state.comment[idx].isLike = !state.comment[idx].isLike;
     },

    //좋아요 리스트 목록 가져오기기
   [getLikeList.fulfilled]: (state, action) => {
      state.likeUsers = action.payload.data.likeUsers;
    },

     //replyComment
     [addReplyComment.fulfilled] : (state, action) => {
      const idx = state.comment.findIndex((c) => c._id === action.meta.arg.commentId);
      state.comment[idx].childComments.push(action.payload.reComment);
    },
    [deleteReplyComment.fulfilled]: (state, action) => {		
      const idx = state.comment.findIndex((c) => c._id === action.meta.arg.Id);
			state.comment[idx].childComments = state.comment[idx].childComments.filter(
				(re) => re._id !== action.meta.arg.commentId );
		 },
     [likedReplyComment.fulfilled]: (state, action) => {
      const idx = state.comment.findIndex((c) => c._id === action.meta.arg.Id);
      const re = state.comment[idx].childComments.findIndex((c) => c._id === action.meta.arg.commentId);
      state.comment[idx].childComments[re].isLike = !state.comment[idx].childComments[re].isLike;
      state.comment[idx].childComments[re].like = action.meta.arg.Relike;
    },
  },
});
export const {delete_post, replyReducer} = postSlice.actions;

export default postSlice;
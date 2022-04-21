import { createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../../common/api/Api";
import { history } from "../../history";
import { add_modal } from "../modal/modalSlice";
import socketIO from "socket.io-client";
import { socket } from "../../common/socket";
import { useDispatch } from 'react-redux';

export const addPost = createAsyncThunk(
  "post/write",
  async ({ formData }, thunkAPI) => {
    const AccessToken = localStorage.getItem("user");
    try {
      const response = await Api({
        url: `/post`,
        method: "POST",
        data: formData,

        headers: {
          Authorization: `Bearer ${AccessToken}`,
        },
      });
      if (response.data.ok) {
        thunkAPI.dispatch(add_modal());
      }
      return response;
    } catch (e) {
      return false;
    }
  }
);

export const getPost = createAsyncThunk(
  "post/getPost",
  async ({page, pageSection}, data, thunkAPI) => {
    const AccessToken = localStorage.getItem("user");
    try {
      const response = await Api({
        url: `/post?page=${page}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${AccessToken}`,
        },
      });
      console.log(response);
      return { data: response.data, pageSection: pageSection };
    } catch (e) {
      alert("로그인을 다시해주세요");
      return false;
    }
  }
);

export const deletePost = createAsyncThunk(
  "post/deletePost",
  async ({ postId }, thunkAPI) => {
    const AccessToken = localStorage.getItem("user");
    try {
      const response = await Api({
        url: `/post/${postId}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${AccessToken}`,
        },
      });
      if (response.data.ok) {
        history.push({ pathname: "/home" });
        return postId;
      }
      return response;
    } catch (e) {
      console.log("삭제에러");
    }
  }
);

// 개별 페이지 불러오기
export const getPostDetail = createAsyncThunk(
  "post/getPostDetail",
  async ({postId, page, pageSection}, thunkAPI ) => {
    const AccessToken = localStorage.getItem("user");
    try {
      const response = await Api({
        url: `/post/${postId}?page=${page}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${AccessToken}`,
        },
      });
      if (response.data.ok) {
        const id = response.data.post[0].writer.userId;
        thunkAPI.dispatch(getUserPost(id));
      };
      return { data: response.data, pageSection: pageSection };
    } catch (e) {
      console.log("getPostDetail 에러");
      return false;
    }
  }
);

//좋아요
export const likePost = createAsyncThunk(
  "post/likePost",
  async ({ postId, path, _id, postLike }) => {
    console.log(postLike);
    const AccessToken = localStorage.getItem("user");
    try {
      const response = await Api({
        url: `/post/${postId}/like`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${AccessToken}`,
        },
      });
      console.log(response);
      if (!postLike) {
        socket.emit("postLike", postId, _id);
      }
      return { path: path, postId: postId, data: response };
    } catch (e) {
      return false;
    }
  }
);

//개인 포스트 가져오기
export const getUserPost = createAsyncThunk(
  "post/getUserPost",
  async (id, thunkAPI) => {
    console.log(id);
    const AccessToken = localStorage.getItem("user");
    try {
      const response = await Api({
        url: `user/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${AccessToken}`,
        },
      });
      console.log(response);
      return response.data;
    } catch (e) {
      alert("로그인을 다시해주세요");
      return false;
    }
  }
);

// 게시물 저장하기
export const savedPost = createAsyncThunk(
  "post/savedPost",
  async ({ postId, AccessToken, path }) => {
    try {
      const response = await Api({
        url: `/post/${postId}/save`,
        method: "PUT",
        headers: { Authorization: `Bearer ${AccessToken}` },
      });
      return { postId: postId, path: path };
    } catch (e) {
      return false;
    }
  }
);

//포스트 좋아요 목록
export const getLikeList = createAsyncThunk(
  "post/getLikeList",
  async ({ postId }, thunkAPI) => {
    const AccessToken = localStorage.getItem("user");
    try {
      const response = await Api({
        url: `/post/${postId}/likeUsers`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${AccessToken}`,
        },
      });
      if (response.data.ok) {
        console.log(response);
        return response;
      }
      return response;
    } catch (e) {
      console.log(e.response);
    }
  }
);

//게시물 랜덤 불러오기

export const randomPost = createAsyncThunk("post/randomPost", async () => {
  try {
    const response = await Api({
      url: `/post/randomPosts`,
      method: "GET",
    });
    if (response.data.ok) {
      console.log(response);
      return response;
    }
  } catch (e) {
    console.log(e.response);
  }
});

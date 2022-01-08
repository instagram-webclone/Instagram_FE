import { createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../../common/api/Api";

// Comment
export const addComment = createAsyncThunk( 
	"commment/addComment", 
	async ({ postId, contents, AccessToken, path }) => { 
		try { const response = await Api({ 
			url: `/comment/${postId}`, 
			method: "POST", 
			data: { contents, }, 
			headers: { Authorization: `Bearer ${AccessToken}`, 
		}, 
	}); 
		if (response.data.ok) { 
			return { path: path, data: response.data }; 
		} 
		return response; 
	} catch (e) { 
		return false; 
	} 
} 
);

export const deleteComment = createAsyncThunk(
	"commment/deleteComment",
	async ({ postId, commentId, AccessToken }) => {
		try {
			const response = await Api({
				url: `/comment/${postId}/${commentId}`,
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${AccessToken}`,
				},
			// }).then((response) => {
			})
			if(response.data.ok){
				console.log(response);
				return commentId;
			}
			return response;

		} catch (e) {

			return false;
		}
	},
);

export const likedComment = createAsyncThunk(
	"commment/likedComment",
	
	async ({ commentId, AccessToken, path, postId }) => {

		try {
			const response = await Api({
				url: `/comment/${commentId}/like`,
				method: "PUT",
				headers: {
					Authorization: `Bearer ${AccessToken}`,
				},
			})
			console.log(response);
			return { path: path, commentId: commentId, postId: postId, data: response.data }; 
		} catch (e) {

			return false;
		}
	},
);

// reply Comment

export const addReplyComment = createAsyncThunk(
	"commment/addReplyComment",
	async ({ postId, commentId, contents, AccessToken }) => {
		try {
			const response = await Api({
				url: `/comment/${postId}/${commentId}`,
				method: "POST",
				data: {
					contents,
				},
				headers: {
					Authorization: `Bearer ${AccessToken}`,
				},
			})
			if(response.data.ok){
				console.log(response);
				return { commentId: commentId, data: response.data };
			}
			return response;
		} catch (e) {

			return false;
		}
	},
);

export const deleteReplyComment = createAsyncThunk(
	"commment/deleteReplyComment",
	async ({ postId, commentId, AccessToken }) => {
		try {
			const response = await Api({
				url: `/comment/${postId}/${commentId}?isReply=true`,
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${AccessToken}`,
				},
			// }).then((response) => {
			})
			if(response.data.ok){
				console.log(response);
				return { commentId: commentId, data: response.data };
			}
			return response;

		} catch (e) {

			return false;
		}
	},
);

export const likedReplyComment = createAsyncThunk(
	"commment/likedReplyComment",
	async ({ commentId, AccessToken }) => {
		try {
			const response = await Api({
				url: `/comment/${commentId}/like`,
				method: "PUT",
				headers: {
					Authorization: `Bearer ${AccessToken}`,
				},
			})
			console.log(response);
			return { commentId: commentId, data: response.data };
		} catch (e) {

			return false;
		}
	},
);

// 댓글, 대댓글 좋아요 누른 사람 목록 보기
export const getLikedListComment = createAsyncThunk(
	"comment/getLikedListComment",
	async ({ commentId, AccessToken }) => {
		try {
			const response = await Api({
				url: `/comment/${commentId}/likeUsers`,
				method: "GET",
				headers: {
					Authorization: `Bearer ${AccessToken}`,
				},
			})
			// console.log(response);
			return { commentId: commentId, data: response.data };
		} catch (e) {
			return false;
		}
	},
);
import {createAsyncThunk} from "@reduxjs/toolkit";
import Api from "../../common/api/Api";
import {history} from "../../history";
import {socket} from "../../common/socket";


//회원가입
export const singUp = createAsyncThunk(
  "user/signup",
  async (data, thunkAPI) => {
    console.log(data.email);
    try {
      const response = await Api({
        url: `/auth/signup`,
        method: "POST",
        data: {
          email: data.email,
          name: data.name,
          userId: data.userId,
          password: data.password,
        },
      });
      console.log(data);
    } catch (e) {
      return thunkAPI.rejectWithValue({
        error: "회원가입실패",
      });
    }
  },
);

//로그인
export const login = createAsyncThunk(
  "user/login",
  async (data, thunkAPI) => {
    try {
      const response = await Api({
        url: "/auth/login",
        method: "POST",

        data: {
          id: data.email,
          password: data.password,
        },
      }).then(response => {
        const accessToken = response.data.token;
        localStorage.setItem("user", accessToken);
        if (response.data.ok) {
          history.replace({pathname: '/home'});
        }
      })
      return response;
    } catch (e) {

      function loginError() {
        alert("로그인실패")
      }

      loginError();
      return false;
    }
  }
)

//로그아웃
export const logout = createAsyncThunk(
  "user/logout",
  async (data, thunkAPI) => {
    localStorage.removeItem("user");
    sessionStorage.removeItem("info");
  }
);

//프로필편집 정보 불러오기
export const getProfile = createAsyncThunk(
  "user/getProfile",
  async (data, thunkAPI) => {
    const AccessToken = localStorage.getItem("user")
    try {
      const response = await Api({
        url: `/accounts/edit`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${AccessToken}`,
        }
      })
      if(response.data.ok){
       sessionStorage.setItem("info",  JSON.stringify(response.data.user));
      }
      return response;

    } catch (e) {
      alert(e.response.data.message);
      return false;
    }
  }
)

//프로필 편집 유저정보 수정
export const editProfile = createAsyncThunk(
  "user/editProfile",
  async (data, thunkAPI) => {
    console.log(data);
    const AccessToken = localStorage.getItem("user")
    try {
      const response = await Api({
        url: `/accounts/edit`,
        method: 'PUT',
        data: {
          name: data.userName,
          userId: data.userId,
          introdution: data.userIntroduce,
          website: data.userWebSite,
          email: data.userEmail,
          phoneNum: data.userNumber,
          gender: data.userGender,
        },
        headers: {
          Authorization: `Bearer ${AccessToken}`,
        }
      })
      console.log(response);
      if(response.data.ok){
        alert("프로필 정보 수정완료");
      }

      return response;
    } catch (e) {
      console.log(e.response);
      return false;
    }
  }
)

//비밀번호 변경
export const changePassword = createAsyncThunk(
  "accounts/password",
  async (data, thunkAPI) => {
    const AccessToken = localStorage.getItem("user");
    try {
      const response = await Api({
        url: `/accounts/password`,
        method: 'PUT',
        data: {
          prevPwd: data.beforePwd,
          newPwd: data.newPwd,
          newPwdCheck: data.checkNewPwd,
        },
        headers: {
          Authorization: `Bearer ${AccessToken}`,
        }
      })
      alert("비밀번호 변경 완료");
      console.log(response);
      return response;
    } catch (e) {
      return false;
    }
  }
)

//팔로우 기능
export const userFollow = createAsyncThunk(
  "user/follow",
  async({Id, isFollowing}, thunkAPI) => {
    console.log(isFollowing);
    const AccessToken = localStorage.getItem("user");
    try {
      const response = await Api({
        url: `/user/follow/${Id}`,
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${AccessToken}`,
        }
      })
      console.log(response);
      if(!isFollowing) {
        socket.emit("follow", Id);
      }
      // socket.emit("follow", Id);
      return response;
    }catch (e) {
      console.log(e.response)
      return false
    }
  }
)
//팔로워 보기
export const getFollower = createAsyncThunk(
  "user/getFollower",
  async(data, thunkAPI) => {
    const AccessToken = localStorage.getItem("user")
    try {
      const response = await Api({
        url: `/user/followers/${data.Id}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${AccessToken}`,
        }
      })
      console.log(response);
      return response;
    }catch (e) {
      console.log(e.response)
      return false
    }
  }
)

//팔로우 보기
export const getFollow = createAsyncThunk(
  "user/getFollow",
  async(data, thunkAPI) => {
    const AccessToken = localStorage.getItem("user")
    try{
      const response = await Api({
        url: `/user/following/${data.Id}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${AccessToken}`,
        }
      })
      console.log(response);
      return response;
    }catch (e) {
      console.log(e.response)
      return false
    }
  }
)

//내가 원하는 팔로워 삭제
export const deleteOneFollower = createAsyncThunk(
  "user/deleteFollower",
  async(data, thunkAPI) => {
    console.log(data);

    const AccessToken = localStorage.getItem("user")
    try {
      const response = await Api({
        url: `/user/follower/deleteFollow/${data._id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${AccessToken}`,
        }
      })
      console.log(response);
      return {response: response, _id: data._id};
    }catch (e) {
      console.log(e.response)
      return false
    }
  }
);


//프로필 이미지 등록
export const profileImg = createAsyncThunk(
  "user/profileImg",
  async({formData, user_id}, thunkAPI) => {
    const AccessToken = localStorage.getItem("user");
    try {
      const response = await Api({
        url: `/accounts/profileImg`,
        method: 'PUT',
        data: formData,
        headers: {
          Authorization: `Bearer ${AccessToken}`,
        }
      })

      if(response.data.ok){
        thunkAPI.dispatch(getProfile());

      }
      return response;
    }catch (e) {
      console.log(e.response)
      return false
    }
  }
)

//프로필 이미지 삭제
export const deleteProfileImg = createAsyncThunk(
  "user/deleteProfileImg",
  async(data, thunkAPI) => {
    const AccessToken = localStorage.getItem("user");
    try {
      const response = await Api({
        url:`/accounts/profileImg`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${AccessToken}`,
        }
      })
      if(response.data.ok){
        thunkAPI.dispatch(getProfile());

      }
      return response;
    }catch (e) {
      console.log(e.response)
      return false
    }
  }
)

//회원탈퇴
export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async(data, thunkAPI) => {
    const AccessToken = localStorage.getItem("user");
    try {
      const response = await Api({
        url:`/accounts/deleteUser`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${AccessToken}`,
        }
      })
      if(response.data.ok){
        localStorage.removeItem("user");
        sessionStorage.removeItem("info");
        alert("회원탈퇴 완료")
        history.push({ pathname: '/login'});
      }
      return response;
    }catch (e) {
      console.log(e.response)
      return false
    }
  }
)

//알림보기

export const getNotification = createAsyncThunk(
  "user/getNotification",
  async(data, thunkAPI) => {
    const AccessToken = localStorage.getItem("user")
    try{
      const response = await Api({
        url: `/user/notification`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${AccessToken}`,
        }
      })
      console.log(response);
      return response;
    }catch (e) {
      console.log(e.response)
      return false
    }
  }
)
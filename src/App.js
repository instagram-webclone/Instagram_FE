import React, {useEffect, useLayoutEffect, useState, Suspense} from "react";
import {Routes, Route, Navigate, Router} from "react-router-dom";
import "./App.scss";
import {useDispatch, useSelector} from "react-redux";
import {history} from "./history";

//주소
import Home from "./components/Main/Main";
import Header from "./components/Page/Header/Header";
import Login from "./components/Page/User/Login/Login";
import SignUp from "./components/Page/User/Login/SignUp";
import FindPassword from "./components/Page/User/Login/FindPassword";
import Recommendation from "./components/Page/Menu/Recommendation/Recommendation";
import DirectMessage from "./components/Page/Menu/DirectMessage/DirectMessage";
import AddPost from "./components/Post/PostWrite/AddPost";
import PostDetail from "./components/Post/PostDetail/PostDetail";
import Profile from "./components/Page/Profile/Profile";
import EditUser from "./components/Page/User/EditUser/EditUser";
import SearchHash from "./components/Page/Header/HeaderSearch/SearchHash";
import PostBoard from './components/Post/PostBoard/PostBoard';
import Notification from "./components/Main/notification";


const CustomRouter = ({history, ...props}) => {
  const [state, setState] = useState({
    action: history.action,
    location: history.location
  });

  useLayoutEffect(() => history.listen(setState), [history]);

  return (
    <Router
      {...props}
      location={state.location}
      navigationType={state.action}
      navigator={history}
    />
  );
};


function App() {
  const dispatch = useDispatch();
  const is_login = useSelector(state => state.user.isLogin);
  const token = localStorage.getItem("user")
  const write_modal = useSelector(state => state.modal.add_modal);




  //헤더 띄우기용
  const show_header = is_login || token;

  return (

    <div className="App" >
      <Suspense fallback={<div>Loading</div>}>
      <CustomRouter history={history}>
        {show_header &&  <Header/>}
        {show_header && <Notification/>}
        {write_modal && <AddPost/>}
        <Routes>
          <Route path="/" element={<RequireAuth redirectTo="/login"> <Home/> </RequireAuth>}/>
          <Route path="/*" element={<RequireAuth redirectTo="/login"> <Home/> </RequireAuth>}/>
          <Route path="/login" element={<RejectAuth redirectTo="/"> <Login/> </RejectAuth>}/>
          <Route path="/accounts/password" element={<RequireAuth redirectTo="/login"> <FindPassword/> </RequireAuth>}/>
          <Route path="/direct/*" element={<RequireAuth redirectTo="/login"> <DirectMessage/> </RequireAuth>}>
            <Route path=":Room" element={<RequireAuth redirectTo="/login"> <DirectMessage/> </RequireAuth>}/>
          </Route>
          <Route path="/recom" element={<RequireAuth redirectTo="/login"> <Recommendation/> </RequireAuth>}/>
          <Route path="/postdetail/:postId" element={<RequireAuth redirectTo="/login"> <PostDetail/> </RequireAuth>}/>
          <Route path="/accounts/signup" element={<RejectAuth redirectTo="/"> <SignUp/> </RejectAuth>}/>
          <Route path="/postform" element={<RequireAuth redirectTo="/login"> <AddPost/> </RequireAuth>}/>
          <Route path="/message" element={<RequireAuth redirectTo="/login"> <DirectMessage/> </RequireAuth>}/>
          <Route path="/edituser" element={<RequireAuth redirectTo="/login"> <EditUser /> </RequireAuth>}/>
					<Route path="/profile/*"	element={<RequireAuth redirectTo="/login"> <Profile /></RequireAuth>}>
          {/*<Route path=":user_Id" element={<RequireAuth redirectTo="/login"> <Profile/> </RequireAuth>}/>*/}
            <Route path=":id/:category"	element={<RequireAuth redirectTo="/login"> <Profile /> </RequireAuth>}/>
          </Route>
          <Route path="/searchhash/*"	element={<RequireAuth redirectTo="/login"> <SearchHash /> </RequireAuth>}>
            <Route path=":searchResult" element={<RequireAuth redirectTo="/login"><SearchHash /> </RequireAuth>}/>
          </Route>
          <Route path="/postboard/:postId" element={<RequireAuth redirectTo="/login"> <PostBoard/> </RequireAuth>}/>
        </Routes>

      </CustomRouter>
    </Suspense>
    </div>

  );
}

function RequireAuth({children, redirectTo}) {
  const token = localStorage.getItem("user");
  return token ? children : <Navigate to={redirectTo}/>;
}

function RejectAuth({children, redirectTo}) {
  const token = localStorage.getItem("user");
  return !token ? children : <Navigate to={redirectTo}/>;
}

export default App;
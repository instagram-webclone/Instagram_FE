import React, {useEffect, useRef, useState} from "react";
import "./HeaderIcon.scss";
import HeaderNotification from "./HeaderNotification/HeaderNotification";
import {Link, useNavigate} from "react-router-dom";

import {
  home, message, write, compass, heart, blackheart,
  blackhome, menu_setting, menu_save, menu_change, menu_profile, none_profile,
  blackcompass
}
  from "../../../common/IconImage";
import {useDispatch, useSelector} from "react-redux";
import {add_modal} from "../../../redux/modal/modalSlice";
import HeaderUser from "./HeaderUser";
import {getProfile} from "../../../redux/user/user";


const HeaderIcon = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [like, SetLike] = useState(false);
  const [myProfile, SetMyProfile] = useState(false);
  const [homeIcon, SetHomeIcon] = useState(false);
  const [compassIcon, SetCompassIcon] = useState(false);

  //외부클릭 감지
  function useOutsideClick(ref) {

    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          SetMyProfile(false);
        }
      }

      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  function LikeOutsideClick(ref) {

    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          SetLike(false);
        }
      }

      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  useEffect(() => {
    dispatch(getProfile())
  }, [dispatch])

  const likeSideRef = useRef(null);
  LikeOutsideClick(likeSideRef);

  const profileSideRef = useRef(null);
  useOutsideClick(profileSideRef);

  const likeClickHandler = () => {
    SetLike(!like);
    SetHomeIcon(false);
    SetCompassIcon(false);
  }

  const myProfileClickHandler = () => {
    SetMyProfile(myProfile => !myProfile);
    SetHomeIcon(false);
    SetCompassIcon(false);
  }
  const homeClickHandler = () => {
    SetHomeIcon(homeIcon => !homeIcon);
    SetCompassIcon(false);
    navigate("/");
  }
  const recommendClickHandler = (event) => {
    SetCompassIcon(compassIcon => !compassIcon);
    SetHomeIcon(false);
    navigate("/recom");
  }

  const postWriteClickHandler = () => {
    dispatch(add_modal());
  }


  //등록한 프로필 사진이 있는 경우와 없는 경우 구분.
  const profile_img = useSelector(state => state.user.user.profileImage);
  const my_img = profile_img && profile_img ? profile_img : none_profile;

  //내정보 불러오기
  const directClickHandler = () => {
    navigate(`/direct`)
  }


  return (
    <>
      <div className="header_icon">
        {homeIcon ? <div className="nav_icon"><img src={blackhome} alt="nav_icon" onClick={homeClickHandler}/></div> :
          <div className="nav_icon"><img src={home} alt="nav_icon" onClick={homeClickHandler}/></div>}
        <div className="nav_icon" onClick={directClickHandler}><img src={message} alt="nav_icon"/></div>
        <div className="nav_icon"><img src={write} alt="nav_icon" onClick={postWriteClickHandler}/></div>
        {compassIcon ?
          <div className="nav_icon"><img src={blackcompass} alt="nav_icon" onClick={recommendClickHandler}/></div> :
          <div className="nav_icon"><img src={compass} alt="nav_icon" onClick={recommendClickHandler}/></div>}

        <div className="nav_icon" ref={likeSideRef}>
          {like ? <img className="nav_heart" src={blackheart} alt="nav_icon" onClick={likeClickHandler}/> :
            <img className="nav_heart" src={heart} alt="nav_icon" onClick={likeClickHandler}/>}
          {like &&
          <div className="like_menu">
            <HeaderNotification/>
          </div>
          }
        </div>
        <div className="profile_icons" ref={profileSideRef}>
          {myProfile ? <img className="nav_profile" src={my_img} alt="nav_icon" onClick={myProfileClickHandler}/> :
            <img src={my_img} alt="nav_icon" onClick={myProfileClickHandler}/>}
          {myProfile && <HeaderUser SetMyProfile={SetMyProfile}/>}
        </div>
      </div>
    </>
  )
}

export default HeaderIcon;
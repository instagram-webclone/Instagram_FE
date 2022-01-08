import "./Profile.scss";
import {Link, useNavigate} from "react-router-dom";
import none_profile from "../../../image/profile.png";
import UserFollower from "../User/Follow/UserFollower";
import {useState} from "react";
import {profile_setting} from "../../../common/IconImage";
import UserFollow from "../User/Follow/UserFollow";
import ProfileImgModal from "../User/EditUser/ProfileImgModal";
import ProfileModal from "./CommonProfile/ProfileSettingModal";
import "./_MyProfileInfo.scss";


//프로필이 자기일 때 보여주는 화면
const MyProfileInfo = ({user_data}) => {
  const navigate = useNavigate();


  //모달관리 (프로필이미지 변경, 설정)
  const [imageChange, SetImageChange] = useState(false);
  const [setting, SetSetting] = useState(false);

  const imageChangeClickHandler = () => {
    SetImageChange(!imageChange);
  }
  const settingClickHandler = () => {
    SetSetting(true);
  };

  const editProfileClickHandler = () => {
    navigate("/edituser");
  }
  // const webSiteClickHandler = () => {
  //   // window.open(`${user_data.website}`,'_blank' )
  //   window.location.href = `${user_data.website}`;
  // }
  return (
    <>
      <div className="imageChange_modal">
        {imageChange && <ProfileImgModal SetImageChange={SetImageChange} imageChange={imageChange}/>}
      </div>
      {setting && <ProfileModal Setsetting={SetSetting}/>}
      <div className="profile_header">

        <div className="profile_header_image" onClick={imageChangeClickHandler}>
          <img src={user_data.profileImage ? user_data.profileImage : none_profile} alt="profile_image"/>
        </div>
        <section className="profile_header_main">
          <div className="profile_header_top">
            <span>{user_data.userId}</span>
            <span onClick={editProfileClickHandler}>프로필 편집</span>
            <img className="profile_settings" src={profile_setting} onClick={settingClickHandler}/>

          </div>
          <ul className="profile_header_mid">
									<span>
										게시물 <span>{user_data.totalPost}</span>
									</span>

            <UserFollower totalFollower={user_data.totalFollower}/>

            <UserFollow totalFollow={user_data.totalFollow}/>
          </ul>
          <div className="profile_header_name">{user_data.name}</div>
          <div className="profile_header_bottom">{user_data.introdution}</div>
          <div className="profile_header_bottom">{user_data.website}</div>
        </section>

      </div>

      {/*모바일크기 프로필*/}
      <div className="mobile_my_profile">
        <div className="mobile_header" >
          <img src={user_data.profileImage ? user_data.profileImage : none_profile} alt="profile_image" onClick={imageChangeClickHandler}/>
          <div className="mobile_header_top">
            <div>
              {user_data.userId}
              <img className="profile_settings" src={profile_setting} onClick={settingClickHandler}/>
            </div>
            <br/>
            <button onClick={editProfileClickHandler}>프로필 편집</button>

          </div>
        </div>
        <div className="mobile_introduce">
          <div>{user_data.name}</div>
          <div>{user_data.introdution}</div>
          <div>{user_data.website}</div>
        </div>
        <div className="mobile_header_mid">
          	<div>
              게시물<br/>
              <span>{user_data.totalPost}</span>
            </div>
          <div>
            <UserFollower totalFollower={user_data.totalFollower}/>
          </div>
          <div>
            <UserFollow totalFollow={user_data.totalFollow}/>
          </div>

        </div>

      </div>
    </>
  )
}

export default MyProfileInfo;
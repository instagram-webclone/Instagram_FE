import none_profile from "../../../image/profile.png";
import "./SideMain.scss";
import {useNavigate} from "react-router";
import {useState} from "react";
import {userFollow} from "../../../redux/user/user";
import {useDispatch} from "react-redux";

const SideRecommend = ({user}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const UserProfileClickHandler = () => {
    const id = user.userId
    navigate(`/profile/${id}/posts`,{state: id})
  }
  const [followButton, SetFollowButton] = useState();


  const followClickHandler = () => {
    dispatch(userFollow({
      isFollowing: user.isFollow,
      Id: user._id,
    }))
    SetFollowButton(followButton => !followButton)
  }
  console.log(user);

  return(
    <>
      <div className="follow_recommend" >
        <div className="recommend_profile" onClick={UserProfileClickHandler}>
          <img src={user.profileImage? user.profileImage : none_profile} alt="profile_image"/>
        </div>
        <div onClick={UserProfileClickHandler}>
          <div className="follow_recommend_id">{user.userId}</div>
          <div className="follow_recommend_text">회원님을 위한 추천</div>
        </div>
        {followButton ?  <a className="recommend_following" onClick={followClickHandler}>팔로잉</a> :
          <a className="recommend_follow" onClick={followClickHandler}>팔로우</a> }

      </div>
    </>
  )
}
export default SideRecommend;

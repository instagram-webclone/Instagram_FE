//팔로우 유저 하나하나 리스트에 보여줄 수 있게 카드로 만들어 줌.

import profile from "../../../../image/profile.png";
import React from "react";
import "./CardStyle.scss";
import FollowButton from "../../../../common/FollowButton";
import {hash_icon} from "../../../../common/IconImage";


const FollowCard = ({follow, hash}) => {

  return (
    <>
      {follow &&  <div className="follow_Card">
        <div className="follow_info">
          {follow.profileImage?  <img src={follow.profileImage} alt="profile_img"/> :  <img src={profile} alt="profile_img"/> }

          <div className="follow_user">
            <div>{follow.userId}</div>
            <div>{follow.name}</div>
          </div>
        </div>
        <div className="card_button">
          <FollowButton isFollow={follow.isFollow} _id={follow._id} isFollowing={follow.isFollowing}/>
        </div>
      </div>}
      {hash && <div className="follow_Card">
        <div className="follow_info">
           <img src={hash_icon} alt="hashtag_image"/>

          <div className="follow_user">
            <div>{hash.hashtag}</div>
          </div>
        </div>
        <div className="card_button">
          <FollowButton hashIsFollow={hash.isFollow} _id={hash._id} isFollowing={hash.isFollowing} hashtag={hash.hashtag}/>
        </div>
      </div>}


    </>
  )
}

export default FollowCard;
import {useState} from "react";
import {useDispatch} from "react-redux";
import {userFollow} from "../redux/user/user";
import "./_FollowButton.scss";
import {hashFollow} from "../redux/search/search";

const FollowButton = ({isFollow, _id, isFollowing, hashIsFollow, hashtag}) => {
  const dispatch = useDispatch();

  const [followButton, SetFollowButton] = useState(isFollow);
  const [hashTagFollow, SetHashTagFollow] = useState(hashIsFollow);

  const followClickHandler = () => {
    dispatch(userFollow({
      isFollowing,
      Id: _id,
    }))
    SetFollowButton(followButton => !followButton);
  }
  const hashTagFollowClickHandler = () => {
    let HashResult = hashtag && hashtag.replace('#', '%23');
    dispatch(hashFollow({
      HashResult
    }))
    SetHashTagFollow(hashTagFollow => !hashTagFollow);
  }


  return (
    <>
      {isFollow && (
        <div className="follow_button_style">

          {followButton ?
            <button className="card_following_button" onClick={followClickHandler}>팔로잉</button> :
            <button className="card_follow_button" onClick={followClickHandler}>팔로우</button>
          }
        </div>
      )}
      {hashIsFollow && (
        <div className="follow_button_style">

          {hashTagFollow ?
            <button className="card_following_button" onClick={hashTagFollowClickHandler}>팔로잉</button> :
            <button className="card_follow_button" onClick={hashTagFollowClickHandler}>팔로우</button>
          }
        </div>
      )}

    </>
  )
}

export default FollowButton;
// 팔로워 리스트 모달

import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {following_modal_check} from "../../../../redux/modal/modalSlice";
import "./_Follow.scss";
import {x_img} from "../../../../common/IconImage";
import FollowCard from "./FollowCard";
import {getFollow} from "../../../../redux/user/user";

const FollowerModal = ({isFollowing}) => {
  const dispatch = useDispatch();


  const cancleClickHandler = () => {
    dispatch(following_modal_check());
  };

  const userId = useSelector(state => state.post.user[0]._id);

  useEffect(() => {
    dispatch(getFollow({
      Id: userId,
    }))
  },[dispatch])
  //
  const FollowList = useSelector(state=>state.user.FollowList);
  const hashList = useSelector(state=>state.user.hashtagFollow);

  const [people, SetPeople] = useState(true);
  const [hashTag, SetHashTag]= useState(false);

  const peopleClickHandler = () => {
    SetPeople(true);
    SetHashTag(false);
  }
  const hashTagClickHandler = () => {
    SetPeople(false);
    SetHashTag(true);
  }


  return (
    <>
      <div className="modal_common_container">
        <div className="modal_common_header">
          <span>팔로잉</span><span> <img onClick={cancleClickHandler} src={x_img} alt="cancle"/></span>
        </div>
        <div className="following_select">
          <div className={people? "active_people" : "none_people"} onClick={peopleClickHandler}>사람</div>
          <div className={hashTag? "active_hashTag" : "none_hashTag"} onClick={hashTagClickHandler}>해쉬태그</div>
        </div>
        <div className="modal_common_card">
          {people && FollowList.map((follow) => (
            <FollowCard
            follow={follow}
            />
          ))}
          {hashTag && hashList.map((hash) => (
            <FollowCard
            hash={hash}/>
          ))}


        </div>
      </div>
      <div className="overlay" onClick={cancleClickHandler}/>
    </>
  );
};

export default FollowerModal;
import {React, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";

import ProfilePosts from "./CommonProfile/ProfilePosts";

// 모달
import ProfileSettingModal from "./CommonProfile/ProfileSettingModal";
import ProfileCollectionModal from './SavedProfile/ProfileCollectionModal';

// scss, icon, img
import "./Profile.scss";
import {FiPlayCircle} from "react-icons/fi";
import {BiBookmark} from "react-icons/bi";
import {RiAccountBoxLine} from "react-icons/ri";
import {MdGridOn} from "react-icons/md";
import ProfileStory from "./ProfileStory";
import MyProfileInfo from "./MyProfileInfo";
import {useLocation, useParams} from "react-router";
import {getUserPost} from "../../../redux/post/post";
import UserProfileInfo from "./UserProfileInfo";

const Profile = () => {

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  //개인 데이터 불러오기
  const {id} = useParams();
  const user_id = useParams(id).user_Id;

  //userpost를 가져오면서 본인이 맞는지 아닌지 확인
  const [myProfile, SetMyProfile] = useState(false);
  const get_my_data = sessionStorage.getItem("info");
  const myId = JSON.parse(get_my_data).userId

  useEffect(() => {
    if (!myProfile) {
      dispatch(getUserPost(id));
    }
    if (myId === id) {
      SetMyProfile(true);
    } else {
      SetMyProfile(false);
    }
  }, [dispatch, myProfile, location, id, myId]);

  // params 받아와서 카테고리 구분 해주고, 카테고리 별 데이터 받아오기.
  const params = useParams();

  const categoryList =
    useSelector((state) => params.category === "posts" ? state.post.post :
      params.category === "video" ? "" :
        params.category === "saved" ? state.post.savedPost : "")

  // params와 해당 카테고리 일치 시, css(border-top) 변화
  const [IsSelected, setSelected] = useState(1);

  useEffect(() => {
    if (params.category === "posts") {
      setSelected(1);
    } else if (params.category === "channel") {
      setSelected(2);
    } else if (params.category === "saved") {
      setSelected(3);
    } else if (params.category === "tagged") {
      setSelected(4);
    }
  }, [params.category]);

  // 프로필 편집, 팔로워, 팔로우 모달
  const is_modal = useSelector((state) => state.modal.is_modal);
  const user_info = useSelector(state => state.post.user);
  const user_data = user_info && user_info[0];
  const my_follow = user_data && user_data.isFollow;


// 컬렉션 생성
  const [openCollectionModal, setOpenCollectionModal] = useState(false);
  const addCollectionHandler = () => {
    setOpenCollectionModal(true);
  }

  return (
    <>
      {is_modal && <ProfileSettingModal/>}
      {openCollectionModal && <ProfileCollectionModal setOpenCollectionModal={setOpenCollectionModal}/>}

      <div className="profile_all">
        <div className="profile_content">
          <div className="profile_profileBox">
            {myProfile && user_data &&
            <MyProfileInfo userId={user_id} user_data={user_data}/>}
            {!myProfile && user_data &&
            <UserProfileInfo
              userId={id}
              Id={user_data._id}
              name={user_data.name}
              totalFollow={user_data.totalFollow}
              totalFollower={user_data.totalFollower}
              totalPost={user_data.totalPost}
              introdution={user_data.introdution}
              profileImage={user_data.profileImage}
              my_follow={my_follow}
            />}
            {/*<ProfileStory/>*/}
            <div className="profile_post_dir" role="tablist">

              {/* 클릭한 해당 카테고리만 css(border-top) 추가 */}
              <a className={IsSelected === 1 ? "profile_post_clicked" : "profile_post_unclicked"}>
									<span onClick={() => navigate(`/profile/${id}/posts`)}>
                  <span><MdGridOn/></span> 게시물
									</span>
              </a>

              <a className={IsSelected === 2 ? "profile_post_clicked" : "profile_post_unclicked"}>
									<span onClick={() => navigate(`/profile/${id}/channel`)}>
                  <span><FiPlayCircle/></span> 동영상
									</span>
              </a>

              {myProfile &&
              <div className={IsSelected === 3 ? "profile_post_clicked" : "profile_post_unclicked"}>
                <span onClick={() => navigate(`/profile/${id}/saved`)}>
                <span><BiBookmark/></span> 저장됨
                </span>
              </div>}

              <a className={IsSelected === 4 ? "profile_post_clicked" : "profile_post_unclicked"}>
									<span onClick={() => navigate(`/profile/${id}/tagged`)}>
                  <span><RiAccountBoxLine/></span> 태그됨
									</span>
              </a>
            </div>

            <div className="post_layout">
              {/* 컬렉션 모달 */}
              {params.category === "saved" &&
              <div className="savedPostBox">
                <div className="desc_savedPost">저장한 내용은 회원님만 볼 수 있습니다</div>
                <div className="add_savedPostBox" onClick={addCollectionHandler}>+ 새 컬렉션</div>
              </div>}

              {/* 카테고리 리스트들을 map 돌린 후, ProfilePost 쪽에서 카테고리 리스트 하나씩 데이터 뿌려주기. */}
              <div className="OtherProfile_postsBox">
                {categoryList && categoryList.map((list, idx) => (
                  <ProfilePosts
                    list={list}
                    category={params.category}
                    key={idx}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

  );
};

export default Profile;

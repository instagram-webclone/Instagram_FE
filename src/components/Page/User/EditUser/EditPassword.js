import "./EditUser.scss";
import profile_image from "../../../../image/profile.png";
import {useDispatch, useSelector} from "react-redux";
import React, {useState} from "react";
import {changePassword} from "../../../../redux/user/user";

const EditPassword = () => {
  const dispatch = useDispatch();

  const [beforePwd, SetBeforePwd] = useState();
  const [newPwd, SetNewPwd] = useState();
  const [checkNewPwd, SetCheckNewPwd] = useState();

  const my_info = useSelector(state => state.user.user);


  const beforePwdOnChange = (e) => {
    SetBeforePwd(e.target.value)
  }
  const newPwdOnChange = (e) => {
    SetNewPwd(e.target.value)
  }
  const checkNewPwdOnChange = (e) => {
    SetCheckNewPwd(e.target.value)
  }

  const ChangePwdClickHandler = () => {
    if(newPwd !== checkNewPwd){
      alert("비밀번호가 다릅니다 다시 확인해 주세요")
    }
    dispatch(changePassword({
      beforePwd,
      newPwd,
      checkNewPwd,
    }), [dispatch])
  }

  return (
    <>
      <div className="password_form">
        <div className="edit_password">
          <div className="password_info">
            <div>
              {profile_image ? <img src={my_info.profileImage} alt="profile_img"/> :
                <img src={profile_image} alt="profile_image"/>}
            </div>
            <div>
              {my_info.userId}
            </div>
          </div>
          <div className="password_item">
            <div>이전 비밀번호</div>
            <div>
              <input type="password" value={beforePwd} onChange={beforePwdOnChange}/>
            </div>
          </div>
          <div className="password_item">
            <div>새 비밀번호</div>
            <div>
              <input type="password" value={newPwd} onChange={newPwdOnChange}/>
            </div>
          </div>
          <div className="password_item">
            <div>새 비밀번호 확인</div>
            <div>
              <input type="password" value={checkNewPwd} onChange={checkNewPwdOnChange}/>
            </div>
          </div>
          <div className="password_item">
            <button onClick={ChangePwdClickHandler}>비밀번호 변경</button>
            <div>비밀번호를 잊으셨나요?</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditPassword;
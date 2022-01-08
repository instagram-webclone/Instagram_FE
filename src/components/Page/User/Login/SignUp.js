import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Footer from "../../Footer/Footer";
import "./SignUp.scss";
import {download1, download2, instagramlogo, facebook_white,} from "../../../../common/LoginImage";
import { BiXCircle, BiCheckCircle } from "react-icons/bi";
import { FiRotateCw } from "react-icons/fi";
import {singUp} from "../../../../redux/user/user";

const SignUp = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [email, SetEmail] = useState("");
	const [name, SetName] = useState("");
	const [userId, SetUserId] = useState("");
	const [password, SetPassword] = useState("");

	// 유효성검사
	const [IsEmail, SetIsEmail] = useState(true);
	const [IsName, SetIsName] = useState(false);
	const [ISUserId, SetIsUserId] = useState(true);

	// 비밀번호표시
	const [checkPassword, SetCheckPassword] = useState(true);

	const SingUpClickHandler = () => {
		dispatch(
			singUp({
				email,
				name,
				userId,
				password,
			}),
			[dispatch],
		);
		alert('가입 되었습니다.');
		navigate("/login");
	};

	const EmailOnChange = (e) => {
		SetEmail(e.target.value);
	};
	const NameOnChange = (e) => {
		SetName(e.target.value);
	};
	const UserIdOnChange = (e) => {
		SetUserId(e.target.value);
	};
	const PassWordOnChange = (e) => {
		SetPassword(e.target.value);
	};

	// 유효성 검사
	const EmailCheck = () => {
		if (email.includes("@")) {
			SetIsEmail(true);
		} else {
			SetIsEmail(false);
		}
	};

	const NameCheck = () => {
		if (name) {
			SetIsName(true);
		} else {
			SetIsName(false);
		}
	};

	const UserIdCheck = () => {
		if (userId) {
			SetIsUserId(true);
		} else {
			SetIsUserId(false);
		}
	};

	const PasswordCheckClickHandler = () => {
		SetCheckPassword(!checkPassword);
	};

	return (
		<>
			<div className="all_content">
				<div className="signup_main">
					<div className="signup_content">
						<div className="signup_signup">
							<img src={instagramlogo} alt="instagram" />
							<div className="signup_header">
								<span>친구들의 사진과 동영상을 보려면 가입하세요.</span>
							</div>
							<div className="signup_fb">
								<button>
									<img src={facebook_white} alt="fb_white" />
									<a href="https://www.facebook.com/login.php">
										Facebook으로 로그인
									</a>
								</button>
							</div>
							<div className="signup_bar">
								<hr className="left" />
								<span>또는</span>
								<hr className="right" />
							</div>
							<div className="signup_form">
								<div className="signup_content_form">
									<input
										type="email"
										value={email}
										onChange={EmailOnChange}
										onKeyUp={EmailCheck}
										required
									/>
									<label className="signup_label">
										<span className="signup_title">
											이메일 주소
										</span>
									</label>
									{!IsEmail && (
										<div className="signup_check_box">
											<span className="signup_check">
												<BiXCircle color={"#F04756"} size={25} />
											</span>
										</div>
									)}
								</div>
								<div className="signup_content_form">
									<input
										type="text"
										value={name}
										onChange={NameOnChange}
										onKeyUp={NameCheck}
										required
									/>
									<label className="signup_label">
										<span className="signup_title"> 성명 </span>
									</label>
									{IsName && (
										<div className="signup_check_box">
											<span className="signup_check">
												<BiCheckCircle color={"#c7c7c7"} size={25} />
											</span>
										</div>
									)}
								</div>
								<div className="signup_content_form">
									<input
										type="text"
										value={userId}
										onChange={UserIdOnChange}
										onKeyUp={UserIdCheck}
										required
									/>
									<label className="signup_label">
										<span className="signup_title">사용자 이름</span>
									</label>
									{!ISUserId && (
										<div className="signup_check_box">
											<span className="signup_check">
												<BiXCircle color={"#F04756"} size={25} />
											</span>
										</div>
									)}
								</div>
								<div className="signup_content_form">
									<input
										required
										type={checkPassword ? "password" : "text"}
										value={password}
										onChange={PassWordOnChange}
										onKeyPress={(e) => {if (e.key == 'Enter'){
											e.preventDefault();
											SingUpClickHandler()
										}
									}}
										/>

									<label className="signup_label">
										<span className="signup_title">비밀번호</span>
									</label>
									<div className="signup_check_box_pwd">
										{password.length > 6 && (
											<span className="signup_check_pwd">
												<BiCheckCircle color={"#c7c7c7"} size={25} />
											</span>
										)}
										{password && (
											<div>
												{checkPassword ? (
													<button
														onClick={PasswordCheckClickHandler}
														className="signup_pwd_check"
													>
														비밀번호 표시
													</button>
												) : (
													<button
														onClick={PasswordCheckClickHandler}
														className="signup_pwd_check"
													>
														숨기기
													</button>
												)}
											</div>
										)}
									</div>
								</div>
									<button
										className={email && password && userId && name ? "signup_btn_active" : "signup_btn_disabled"}
										onClick={SingUpClickHandler}
									>
										가입
									</button>
							</div>
						</div>
						<div className="signup_login">
							계정이 있으신가요?
							<Link className="link" to="/login">
								<span> 로그인</span>
							</Link>
						</div>
						<div className="signup_download">
							<p>앱을 다운로드하세요.</p>
							<span>
								<a
									target="_blank"
									rel="noreferrer"
									href="https://apps.apple.com/app/instagram/id389801252?vt=lo"
								>
									<img src={download2} alt="download2" />
								</a>
							</span>
							<span>
								<a
									target="_blank"
									rel="noreferrer"
									href="https://play.google.com/store/apps/details?id=com.instagram.android"
								>
									<img src={download1} alt="download1" />
								</a>
							</span>
						</div>
					</div>
				</div>
				<Footer />
			</div>
		</>
	);
};

export default SignUp;

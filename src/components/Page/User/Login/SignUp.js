import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import Footer from "../../Footer/Footer";
import "./SignUp.scss";
import {download1, download2, instagramlogo, facebook_white,} from "../../../../common/LoginImage";
import { BiXCircle, BiCheckCircle } from "react-icons/bi";
import {singUp} from "../../../../redux/user/user";

const SignUp = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { register, handleSubmit, watch, formState: {errors} } = useForm();

	// 비밀번호표시
	const [checkPassword, SetCheckPassword] = useState(true);

	// 회원가입 서버 요청
	const onSubmit = (value) => {
		console.log(value);
		dispatch(
			singUp({
				email: value.email,
				name: value.username,
				userId: value.userId,
				password: value.password,
			}),
			[dispatch],
		);
		alert('가입 되었습니다.');
		navigate("/login");
	};

	const PasswordCheckClickHandler = (e) => {
		e.preventDefault();
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
							<form className="signup_form">
								<div className="signup_content_form">
									<input
										name="email"
										type="email"
										autoComplete="off"
										{...register("email", {required: "Required", pattern: /^\S+@\S+$/i})}
									/>
									{errors.email && errors.email.type !== `/^\S+@\S+$/i` &&
										<div className="signup_check_box">
											<span className="signup_check">
												<BiXCircle color={"#F04756"} size={25} />
											</span>
										</div>}
									{errors.email && errors.email.type === "required"  &&
									<div className="signup_check_box">
										<span className="signup_check">
											<BiXCircle color={"#F04756"} size={25} />
										</span>
									</div>}
									<label className="signup_label">
										<span className="signup_title">
											이메일 주소
										</span>
									</label>
								</div>
								<div className="signup_content_form">
									<input
										name="username"
										autoComplete="off"
										{...register("username", {required: "Required", minLength: 4})}
									/>
									 {errors.username && errors.username.type === "required"  &&
										<div className="signup_check_box">
											<span className="signup_check">
												<BiXCircle color={"#F04756"} size={25} />
											</span>
										</div>}
									{errors.username && errors.userId.type === "minLength"  &&
									<div className="signup_check_box">
										<span className="signup_check">
											<BiXCircle color={"#F04756"} size={25} />
										</span>
									</div>}
									<label className="signup_label">
										<span className="signup_title"> 성명 </span>
									</label>
								</div>
								<div className="signup_content_form">
									<input
										name="userId"
										autoComplete="off"
										{...register("userId", {required: "Required", minLength: 4})}
									/>
									{errors.userId && errors.userId.type === "required" &&
										<div className="signup_check_box">
											<span className="signup_check">
												<BiXCircle color={"#F04756"} size={25} />
											</span>
										</div>}
									{errors.userId && errors.userId.type === "minLength" &&
									<div className="signup_check_box">
										<span className="signup_check">
											<BiXCircle color={"#F04756"} size={25} />
										</span>
									</div>}
									<label className="signup_label">
										<span className="signup_title">사용자 이름</span>
									</label>
								</div>
								<div className="signup_content_form">
									<input
										name="password"
										type={checkPassword ? "password" : "text"}
										autoComplete="off"
										{...register("password", {required: "Required", minLength: 6})}
										onKeyPress={(e) => {if (e.key == 'Enter'){
										  handleSubmit(onSubmit)
										}
									}}
										/>
											<div>
												{checkPassword ? (
													<button
														className="signup_pwd_check"
														onClick={PasswordCheckClickHandler}
													>
														비밀번호 표시
													</button>
												) : (
													<button
														className="signup_pwd_check"
														onClick={PasswordCheckClickHandler}														
													>
														숨기기
													</button>
												)}
											</div>
										{errors.password && errors.password.type === "minLength" &&
											<span className="signup_check_pwd">
												<BiXCircle color={"#F04756"} size={25} />
											</span>}
										{errors.password && errors.password.type === "Required" &&
										<span className="signup_check_pwd">
											<BiXCircle color={"#F04756"} size={25} />
										</span>}

									<label className="signup_label">
										<span className="signup_title">비밀번호</span>
									</label>
									<div className="signup_check_box_pwd">
									</div>
								</div>
									<button
									className="signup_btn_active"
										// className={ showSubmit ? "signup_btn_active" : "signup_btn_disabled"}
										onClick={handleSubmit(onSubmit)}
									>
										가입
									</button>
							</form>
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

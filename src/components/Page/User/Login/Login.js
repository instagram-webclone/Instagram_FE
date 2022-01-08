import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {login} from "../../../../redux/user/user";

import Carousel from "./LoginCarousel";
import Footer from "../../Footer/Footer";
import "./Login.scss";
import {login_pic1, download1, download2, instagramlogo, facebook} from "../../../../common/LoginImage";

const Login = () => {
	const dispatch = useDispatch();
	const [email, SetEmail] = useState();
	const [password, SetPassword] = useState();

	// 비밀번호표시
	const [checkPassword, SetCheckPassword] = useState(true);

	const onChangeEmail = (e) => {
		SetEmail(e.target.value);
	};
	const onChangePassword = (e) => {
		SetPassword(e.target.value);
	};

	//로그인 서버 요청
	const loginClickHandler = () => {
		dispatch(
			login({email,
				password,
			}),
		);
	};

	const PasswordCheckClickHandler = () => {
		SetCheckPassword(!checkPassword);
	};

	return (
		<>
			<div className="all_content">
				<div className="login_all">
					<div className="login_side_img">
						<img className="login_pic1" src={login_pic1} alt="login_pic1" />
						<Carousel className="carousel" />
					</div>
					<section className="login_main">
						<div className="login_content">
							<img src={instagramlogo} alt="instagram" />
							<div className="login_login_user">
								<input
									type="text"
									autoComplete="off"
									value={email}
									onChange={onChangeEmail}
									required
								/>
								<label className="login_label_username">
									<span className="login_content_username">
										사용자 이름 또는 이메일
									</span>
								</label>
							</div>
							<div className="login_login_pwd">
								<input
									className="login_login_input_pwd"
									required
									type={checkPassword ? "password" : "text"}
									value={password}
									onChange={onChangePassword}
									onKeyPress={(e) => {if (e.key === 'Enter') {
										e.preventDefault();
										loginClickHandler()
									}
								}}
								/>

								<label className="login_label_pwd">
									<span className="login_content_pwd">비밀번호</span>
								</label>
								{password && (
									<div className="login_check_pwd">
										{checkPassword ? (
											<button onClick={PasswordCheckClickHandler}>
												비밀번호 표시
											</button>
										) : (
											<button onClick={PasswordCheckClickHandler}>
												숨기기
											</button>
										)}
									</div>
								)}
							</div>
							<div className="login_login_btn">
								<button
									className={email && password ? "login_btn_disabled" : "login_btn_active"}
									type="submit"
									onClick={loginClickHandler}										
								>
									로그인
								</button>
							</div>
							<div className="login_bar">
								<div className="left" />
								<span>또는</span>
								<div className="right" />
							</div>
							<div className="login_login_fb">
								<span>
									<img src={facebook} alt="fb" />
									<a href="https://www.facebook.com/login.php">
										Facebook으로 로그인
									</a>
								</span>
							</div>
							<div class="login_findPw">
								<Link className="link" to="/accounts/password">
									<button>비밀번호를 잊으셨나요?</button>
								</Link>
							</div>
						</div>
						<div className="login_signup">
							계정이 없으신가요?
							<Link className="link" to="/accounts/signup">
								<span> 가입하기</span>
							</Link>
						</div>
						<div className="login_download">
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
					</section>
				</div>
				<Footer />
			</div>
		</>
	);
};

export default Login;

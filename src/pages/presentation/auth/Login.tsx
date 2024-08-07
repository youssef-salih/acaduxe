import React, { FC, useCallback, useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useFormik } from 'formik';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import Card, { CardBody } from '../../../components/bootstrap/Card';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import Button from '../../../components/bootstrap/Button';
import Logo from '../../../components/Logo';
import useDarkMode from '../../../hooks/useDarkMode';
import AuthContext from '../../../contexts/authContext';
import USERS, { getUserDataWithUsername } from '../../../common/data/userDummyData';
import Spinner from '../../../components/bootstrap/Spinner';
import Alert from '../../../components/bootstrap/Alert';
import bg from '../../../assets/bg/bg.jpg';
import InputGroup, { InputGroupText } from '../../../components/bootstrap/forms/InputGroup';
import { Person } from '../../../components/icon/material-icons';

interface ILoginHeaderProps {
	isNewUser?: boolean;
}
const LoginHeader: FC<ILoginHeaderProps> = ({ isNewUser }) => {
	if (isNewUser) {
		return (
			<>
				<div className='text-center h1 fw-bold mt-5'>Create Account,</div>
				<div className='text-center h4 text-muted mb-5'>Sign up to get started!</div>
			</>
		);
	}
	return (
		<>
			<div className='text-center h1 fw-bold mt-5'>Welcome,</div>
			<div className='text-center h4 text-muted mb-5'>Sign in to continue!</div>
		</>
	);
};
LoginHeader.defaultProps = {
	isNewUser: false,
};
interface ILoginProps {
	isSignUp?: boolean;
}
const Login: FC<ILoginProps> = ({ isSignUp }) => {
	const { setUser } = useContext(AuthContext);
	const { darkModeStatus } = useDarkMode();
	const [signInPassword, setSignInPassword] = useState<boolean>(false);
	const [singUpStatus, setSingUpStatus] = useState<boolean>(!!isSignUp);
	const navigate = useNavigate();
	const handleOnClick = useCallback(() => navigate('/'), [navigate]);
	const usernameCheck = (username: string) => {
		return !!getUserDataWithUsername(username);
	};
	const passwordCheck = (username: string, password: string) => {
		return getUserDataWithUsername(username).password === password;
	};

	// const onSubmit = (values: any) => {
	// 	// alert(JSON.stringify(values));
	// 	if (usernameCheck(values.loginUsername)) {
	// 		if (passwordCheck(values.loginUsername, values.password)) {
	// 			if (setUser) {
	// 				setUser(values.loginUsername);
	// 			}

	// 			handleOnClick();
	// 		} else {
	// 			formik.setFieldError('password', 'Username and password do not match.');
	// 		}
	// 	}
	// };

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			loginUsername: USERS.JOHN.username,
			loginPassword: USERS.JOHN.password,
		},
		validate: (values) => {
			const errors: { loginUsername?: string; loginPassword?: string } = {};
			if (!values.loginUsername) {
				errors.loginUsername = 'Required';
			}
			if (!values.loginPassword) {
				errors.loginPassword = 'Required';
			}
			return errors;
		},
		validateOnChange: false,
		onSubmit: (values) => {
			if (usernameCheck(values.loginUsername)) {
				if (passwordCheck(values.loginUsername, values.loginPassword)) {
					if (setUser) {
						setUser(values.loginUsername);
					}

					handleOnClick();
				} else {
					formik.setFieldError('loginPassword', 'Username and password do not match.');
				}
			}
		},
	});

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const handleContinue = () => {
		setIsLoading(true);
		setTimeout(() => {
			if (
				!Object.keys(USERS).find(
					(f) => USERS[f].username.toString() === formik.values.loginUsername,
				)
			) {
				formik.setFieldError('loginUsername', 'No such user found in the system.');
			} else {
				setSignInPassword(true);
			}
			setIsLoading(false);
		}, 1000);
	};
	return (
		<div className='w-100 '>
			<PageWrapper
				className='p-0'
				isProtected={false}
				title={singUpStatus ? 'Sign Up' : 'Login'}>
				<Page className='p-0 w-screen'>
					<Card className='rounded-none w-1/2 h-screen mb-0'>
						<CardBody className=' flex flex-col justify-center'>
							<div className='text-center'>
								<h1 className='text-5xl font-bold'>Login</h1>
								<p className='capitalize text-xl font-bold'>Welcome our teacher</p>
							</div>
							<form action=''>
								<InputGroup>
									<InputGroupText>
										<Person />
									</InputGroupText>
									<Input ariaLabel='Input' />
								</InputGroup>
								<InputGroup>
									<InputGroupText>
										<Person />
									</InputGroupText>
									<Input ariaLabel='Input' />
								</InputGroup>
							</form>
						</CardBody>
					</Card>
				</Page>
			</PageWrapper>
		</div>
	);
};
Login.propTypes = {
	isSignUp: PropTypes.bool,
};
Login.defaultProps = {
	isSignUp: false,
};
export default Login;

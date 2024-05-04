import React from 'react';
import '../Styles/header.css';
import GoogleLogin from 'react-google-login';
import Modal from 'react-modal';
import axios from 'axios';



const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'antiquewhite',
        border: '1px solid brown'
    },
};

class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            loginModalIsOpen: false,
            isLoggedIn: false,
            loggedInUser: undefined,
            loginModalWithCredentialIsOpen: false,
            email: '',
            password: '',
            firstname: '',
            lastname: '',
    
            loginError: undefined,
            isSignupModalOpen: false,
            signuperror: undefined
        }
    }

    responseGoogle = (response) => {
        this.setState({ isLoggedIn: true, loggedInUser: response.profileObj.name, loginModalIsOpen: false });
    }

    handleModal = (state, value) => {
        this.setState({ [state]: value });
    }

    handleLogout = () => {
        this.setState({ isLoggedIn: false, loggedInUser: undefined });
    }
    handleChange = (e, field) => {
        const val = e.target.value;
        this.setState({
            [field]: val,
            loginError:undefined,
            signuperror:undefined
        })
    }
    loginHandler = () => {
        const { email, password } = this.state;
        const req = {
            email: email,
            password: password
        }
        axios({
            url: 'http://localhost:8989/login',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: req
        }).then(res => {
            const user = res.data.user;
            const pop = user[0].firstname

            this.setState({
                loggedInUser: pop,
                isLoggedIn: true,
                loginError: undefined,
                loginModalIsOpen: false,
                loginModalWithCredentialIsOpen: false

            })
        })
            .catch(err => {
                this.setState({
                 
                    isLoggedIn: false,
                    loginError: "username or password is not defined",


                })
                console.log(err);
            })


    }
    signupHandler = () => {
        const { email, password, firstname, lastname } = this.state;
        const req = {
            email,
            password: password,
            firstname,
            lastname
        };
        axios({
            url: 'http://localhost:8989/signup',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: req
        }).then(res => {
            const user = res.data.user;
            const pop = user[0].firstname
            this.setState({
                loggedInUser: pop,
                isLoggedIn: true,
                signuperror: undefined,
                isSignupModalOpen: false

            })

        })
            .catch(err => {
                this.setState({

                    isLoggedIn: false,
                    signuperror: "you are already registered please login",


                })
                
            })




    }
    render() {
        const { loginModalIsOpen, loggedInUser, isLoggedIn, loginModalWithCredentialIsOpen, email, password, loginError, isSignupModalOpen, firstname, lastname, signuperror } = this.state;
        return (
            <div>
                <div class="header">
                    <div class="header-logo">
                        <b>e!</b>
                    </div>
                    {!isLoggedIn ?
                        <div class="user-group">
                            <div class="login" onClick={() => this.handleModal('loginModalIsOpen', true)}>Login</div>
                            <div class="signup" onClick={() => this.handleModal('isSignupModalOpen', true)}>Create an account</div>
                        </div>
                        : <div class="user-group">
                            <div class="login">{loggedInUser}</div>
                            <div class="signup" onClick={this.handleLogout}>Logout</div>
                        </div>}
                </div>
                <Modal
                    isOpen={loginModalIsOpen}
                    style={customStyles}
                >
                    <div>
                        <div class="glyphicon glyphicon-remove" style={{ float: 'right', marginBottom: '10px' }}
                            onClick={() => this.handleModal('loginModalIsOpen', false)}></div>
                        <GoogleLogin
                            clientId="214934564540-vi1l5qarbeve27k6pi3u6bah5efqbu55.apps.googleusercontent.com"
                            buttonText="Continue with Google"
                            onSuccess={this.responseGoogle}
                            onFailure={this.responseGoogle}
                            cookiePolicy={'single_host_origin'}
                        />
                        <br />
                        <button class="btn btn-light" onClick={() => this.handleModal('loginModalWithCredentialIsOpen', true)}>Continue with Credentials</button>
                    </div>
                </Modal>
                <Modal
                    isOpen={loginModalWithCredentialIsOpen}
                    style={customStyles}
                >
                    <div>


                        <h2>
                            Login
                            <div class="glyphicon glyphicon-remove" style={{ float: 'right', marginBottom: '10px' }}
                                onClick={() => this.handleModal('loginModalWithCredentialIsOpen', false)}></div>
                        </h2>
                        <form className='form'>
                            {loginError ? <div className='alert alert-danger text-centre'>{loginError}</div> : null}
                            <input type="email" classname="form-control" placeholder="Email" required value={email} onChange={(e) => this.handleChange(e, 'email')}></input>
                            <br></br>
                            <input type="password" classname="form-control" placeholder="Password" required value={password} onChange={(e) => this.handleChange(e, 'password')}></input>
                            <div className='text-centre'>
                                <input type="button" classname="btn-btn-primary" onClick={this.loginHandler} value='Login'></input>
                                <button className='btn' onClick={() => this.handleModal('loginModalWithCredentialIsOpen', false)}>Cancel</button>
                            </div>
                        </form>

                    </div>
                </Modal>
                <Modal
                    isOpen={isSignupModalOpen}
                    style={customStyles}
                >

                    <h2>
                        SignUp
                        <div class="glyphicon glyphicon-remove" style={{ float: 'right', marginBottom: '10px' }}
                            onClick={() => this.handleModal('isSignupModalOpen', false)}></div>

                    </h2>
                    <form className='form'>
                        {signuperror ? <div className='alert alert-danger text-centre'>{signuperror}</div> : null}
                        <input type="email" classname="form-control" placeholder="Email" required value={email} onChange={(e) => this.handleChange(e, 'email')}></input>
                        <br></br>
                        <input type="password" classname="form-control" placeholder="Password" required value={password} onChange={(e) => this.handleChange(e, 'password')}></input>
                        <br></br>
                        <input type="text" classname="form-control" placeholder="First Name" required value={firstname} onChange={(e) => this.handleChange(e, 'firstname')}></input>
                        <br></br>
                        <input type="text" classname="form-control" placeholder="Lastname" required value={lastname} onChange={(e) => this.handleChange(e, 'lastname')}></input>
                        <br></br>
                        <div className='text-centre'>
                            <input type="button" classname="btn-btn-primary" onClick={this.signupHandler} value='signup'></input>
                            <button className='btn' onClick={() => this.handleModal('isSignupModalOpen', false)}>Cancel</button>
                        </div>
                    </form>

                </Modal>
            </div>
        )
    }
}

export default Header;

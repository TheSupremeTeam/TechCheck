import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import { Link } from 'react-router-dom';
import axios from "axios";

import './LoginButton.css';
import { Container, Col, Row } from 'react-grid-system';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSignInDialogue: false,
            open: false,
            email: '',
            pass: '',
            doesntMatch: false,
            noUser: false

        }
    }
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };




    onSubmit = () => {
    let lowerCaseEmail=this.state.email.toLowerCase()
        const self = this;
        axios({
            method: 'post',
            url: '/api/users/signIn',
            data: {
                email:lowerCaseEmail ,
                pass: this.state.pass,
            },
        })
            .then(function (res) {
                if (res.data === 'noMatch') {
                    self.setState({ doesntMatch: true, noUser: false });

                } else if (res.data === 'noUser') {
                    self.setState({ noUser: true, doesntMatch: false });

                }
                else {
                    console.log(res)
                    sessionStorage.setItem('auth', res.data)
                    self.handleClose()
                    window.location.reload(true);
                }
            }).catch(function (error) {
                console.log(error);
            });
        //   const currentState = this.state.noMatch;
        //   this.setState({ noMatch: !currentState });
    }


    static muiName = 'FlatButton';

    render() {
        return (
            <div>
                <div className='LogInSection'>
                    <FlatButton {...this.props} label="Login" onClick={this.handleOpen} />
                </div>
                <Container>
                    <Dialog
                        title="Login / Registration"
                        autoDetectWindowHeight={true}
                        className='Dialogue'
                        modal={false}
                        open={this.state.open}
                        onRequestClose={this.handleClose}
                        style={{ margin: 'auto', maxHeight: '100%'}}
                    >

                        <Row>
                            <Col sm={6}>
                                <Row>
                                    <Col sm={12}>
                                        <TextField
                                            floatingLabelText="Email"
                                            name='email'
                                            hintText="Email"
                                            onChange={this.onChange}
                                            className='TextInput'
                                        /><br />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={12}>
                                        <TextField
                                            name="pass"
                                            hintText="Password"
                                            floatingLabelText="Password"
                                            type="Password"
                                            onChange={this.onChange}
                                            className='TextInput'
                                        /><br />
                                    </Col>
                                </Row>
                                <br />
                                <br />

                                <div className='SignInDiv'>
                                    <Row>
                                        <Col sm={12}>
                                            <FlatButton
                                                style={{ backgroundColor: 'white', width: '255px', maxWidth:'100%'  }}
                                                label="Submit"
                                                primary={true}
                                                keyboardFocused={true}
                                                onClick={this.onSubmit}
                                            />
                                       
                                            <FlatButton
                                                style={{ backgroundColor: '#DD4124', width: '255px', maxWidth:'100%'  }}
                                                label="Cancel"
                                                primary={true}
                                                onClick={this.handleClose}
                                            />
                                        </Col>
                                    </Row>
                                </div>


                                <div className='RegistrationDiv' style={{ paddingTop: '15px' }}>
                                    <Row>
                                        <Col sm={12}>
                                            {/* <Link to='/registration'
                                                onClick={this.handleClose}
                                                style={{ maxWidth: '100%', marginRight: '10px'}}
                                            > */}
                                            <FlatButton href='/registration'  onClick={this.handleClose} style={{ backgroundColor: 'blue', width: '255px', maxWidth:'100%'  }}>
                                                Registration</FlatButton>
                                            {/* </Link> */}

                                            {/* <Link to='/acount/recovery'
                                                onClick={this.handleClose}
                                                style={{ maxWidth: '100%' }}
                                            > */}
                                            <FlatButton href='/acount/recovery'onClick={this.handleClose} style={{ backgroundColor: 'green', width: '255px', maxWidth:'100%'  }}>
                                                Forgot Password</FlatButton>
                                        
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                            <Col sm={6}>
                                {this.state.noUser &&
                                    <p>There is no account associated with that email</p>}
                                {this.state.doesntMatch &&
                                    <p>Email or password dont match. Please try again.</p>
                                }
                                <img src="https://i.imgur.com/heRuT1H.png" alt="TClogo"/>
                            </Col>
                        </Row>
                    </Dialog>
                </Container>

            </div>

        );
    }
}

export default Login;
import React from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Subheader from 'material-ui/Subheader';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const styles = {
    button: {
      margin: 12,
    },
    exampleImageInput: {
      cursor: 'pointer',
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      width: '100%',
      opacity: 0,
    },
  };

const userRegistrationStyles = {
    h1: {
        color: 'white',
    },

    buttonDiv: {
        backgroundColor: 'white',
        fontSize: '20px'
    },

    wrapper: {
        backgroundColor: 'black',
        textAlign: 'center',
    },
}


class addUser extends React.Component {
    state= {
        error: null, 
    person: {
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        address: "",
        dateOfBirth: "",
        profilePic: ""
    }}
    render() {
return (
    <MuiThemeProvider>
    <div style={{padding: '30px 0'}}>
        <div>{this.state.error}</div>
        <div>
            <TextField
                name="email"
                value={this.state.person.email}
                floatingLabelText="Email Address"
                onChange={this.handleChange}/>
                <br />
            <TextField
                name="firstname"
                value={this.state.person.firstName}
                floatingLabelText="First Name"
                onChange={this.handleChange}/>
                <br />
            <TextField
                name="lastname"
                value={this.state.person.lastName}
                floatingLabelText="Last Name"
                onChange={this.handleChange}/>
                <br />
            <TextField
                name="address"
                value={this.state.person.address}
                floatingLabelText="Address"
                onChange={this.handleChange}/>
                <br />
            <TextField
                name="phonenumber"
                value={this.state.person.phoneNumber}
                floatingLabelText="Phone Number"
                onChange={this.handleChange}/>
                <br />
            <TextField
                name="dob"
                value={this.state.person.dateOfBirth}
                floatingLabelText="Last Name"
                onChange={this.handleChange}/>
                <br />
            <TextField
                name="password"
                type="password"
                value={this.state.person.password}
                floatingLabelText="Password"
                onChange={this.handleChange}/>
                <br />
            <TextField
                name="passwordconfirm"
                type="password"
                value={this.state.person.password}
                floatingLabelText="Confirm Password"
                onChange={this.handleChange}/>
                <br />
            <RaisedButton
                label="Upload Avatar"
                labelPosition="before"
                style={styles.button}
                containerElement="label"
                >
                <input type="file" style={styles.exampleImageInput}  />
            </RaisedButton>
        </div>
        <div>
            <br />
            <RaisedButton onClick={this.onClick} label="Submit!" />
        </div>
    </div>
    </MuiThemeProvider>
);
}
}
// const addUser = () => {
//     return (
//         <div style={userRegistrationStyles.wrapper}>
//             <h1 style={userRegistrationStyles.h1}> Sign-up!! </h1>
//             <Subheader> First Name :</Subheader>
//             <TextField
//                 hintText="First Name"
//                 helper="First Name"
//             /><br />
//             <Subheader> Last Name :</Subheader>
//             <TextField
//                 hintText="Last Name"
//             /><br />
//             <Subheader> Address :</Subheader>
//             <TextField
//                 hintText="Address"
//                 multiLine={true}
//                 rows={2}
//             /><br />
//             <Subheader> E-mail :</Subheader>
//             <TextField
//                 hintText="E-mail"
//             /><br />
//             <div style={{ padding: '20px' }}>
//                 <FlatButton style={userRegistrationStyles.buttonDiv} label='Submit' primary={true} />
//             </div>
//         </div>
//     );
// }

export default addUser;
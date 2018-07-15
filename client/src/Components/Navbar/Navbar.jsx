import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import SearchBar from 'material-ui-search-bar';
import LoggedInButton from './LoggedInButton/LoggedInButton';
import LoginButton from './LoginButton/LoginButton';
import CartModal from './CartButton/CartModal';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import MobileTearSheet from './mobiletear/mobiletearsheet'
import './navbar.scss'
import {List, ListItem} from 'material-ui/List';
import FlatButton from 'material-ui/FlatButton/FlatButton';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import Divider from 'material-ui/Divider';
import ActionInfo from 'material-ui/svg-icons/action/info';
import graphicscard from './catphotos/graphicscard.jpg'
class Navbar extends Component {

  state = {
    dataSource: '',
    search: '',
    userEmail: '',
    open:false
   
  };

  componentDidMount = (props) => {
 
     this.setState({
       open:true
     })
  }


  handleToggle = () => this.setState({open: !this.state.open});
  handleclose=()=>{
      this.setState({
          open:false
      })
  }
  onsubmit = () => {

    window.location = `/searchResults/${this.state.search}`
  }
  componentDidMount = () => {

  }
  goHome = () => {
    window.location = '/'
  }


  componentWillReceiveProps = (props, err) => {
    let email = 'both@all.com'
    try {
      email = props.userdata.email.split('@')
    } catch (error) {
    }
    try {
      this.setState({
        userEmail:  email[1].toLowerCase()
      })
    } catch (error) {
    }
  }

  onChange = (e) => {

    this.setState({
      search: e
    });
  }
  render(componentWillReceiveProps) {

    let email = null;
    if (this.state.userEmail === 'gmail.com') {
      email = < a className="button" href='https://www.google.com/gmail/about/#'> Gmail.com  </a>
    } else if (this.state.userEmail === 'yahoo.com') {
      email = <a href='https://login.yahoo.com/?.src=ym&.intl=us&.done=https%3A%2F%2Fmail.yahoo.com%2F'> Yahoo.com  </a>
    } else if (this.state.userEmail === 'aol.com') {
      email = <a href='https://my.screenname.aol.com/_cqr/login/login.psp?sitedomain=sns.mail.aol.com&seamless=novl&lang=en&locale=US&authLev=0&siteState=uv%3AAOL%7Crt%3ASTD%7Cat%3ASNS%7Clc%3Aen_US%7Cld%3Amail.aol.com%7Csnt%3AScreenName%7Csid%3A75be8f73-edfd-4559-8c55-945b9c9b2f4f%7Cqp%3A%7C&offerId=newmail-en-us-v2'> Aol.com </a>
    } else if (this.state.userEmail === 'icloud.com') {
      email = <a href='https://www.icloud.com/#mail'> iCloud.com </a>
    } else if (this.state.userEmail === 'zoho.com') {
      email = <a href='https://accounts.zoho.com/signin?servicename=VirtualOffice&signupurl=https://workplace.zoho.com/orgsignup.do?signup.html'>zoho</a>
    } else if (this.state.userEmail === 'mail.com') {
      email = <a href='https://www.mail.com/'>Mail.com</a>
    } else if (this.state.userEmail === 'gmx.com') {
      email = <a href='https://www.gmx.com/'>Gmx.com</a>
    } else if (this.state.userEmail === 'fastmail.com') {
      email = <a href='https://www.fastmail.com/login/'>Fastmail.com</a>
    } else if (this.state.userEmail === 'hushmail.com') {
      email = <a href='https://www.hushmail.com/preview/hushmail/'>Hushmail.com</a>
    } else if (this.state.userEmail === 'inbox.com') {
      email = <a href='https://www.inbox.com/login.aspx?gdi=true'>Inbox.com</a>
    } else if (this.state.userEmail === 'mail.chapman.edu') {
      email = <a href='https://accounts.google.com/signin/v2/identifier?continue=https%3A%2F%2Fmail.google.com%2Fmail%2F&service=mail&hd=mail.chapman.edu&sacu=1&flowName=GlifWebSignIn&flowEntry=AddSession'>Mail.Chapman.edu</a>
    } else if (this.state.userEmail === 'Outlook.com' || '@live.com' || '@msn.com') {
      email = <a href='https://login.live.com/login.srf?wa=wsignin1.0&rpsnv=13&ct=1517256493&rver=6.7.6640.0&wp=MBI_SSL&wreply=https%3a%2f%2foutlook.live.com%2fowa%2f%3fRpsCsrfState%3df12b20f0-5350-42ba-2520-eb9549b24978&id=292841&whr=gmail.com&CBCXT=out&lw=1&fl=dob%2cflname%2cwld&cobrandid=90015'>Outlook.com/Msm.com/Live.com</a>
    }
    else{
      email=<p></p>
    }
    return (
      <div>
        {!this.props.userdata.verified && this.props.logged &&
          <div className='verify'>
            Please verify your email address. <br />
            <div>
              {email}
            </div>
          </div>
        }
   
        <AppBar
        
          title={<img onClick={this.goHome} src="https://i.imgur.com/heRuT1H.png" alt="TClogo" style={{ margin: 'auto', maxWidth: '100%', height: '80px', marginLeft: '150px' }} />}
          style={{ backgroundColor: "#2196F3", }}
          showMenuIconButton={false}
          iconElementRight={this.props.logged ? <LoggedInButton userdata={this.props.userdata} photoSource={this.props.photoSource} logout={this.props.logoutFunction} /> : <LoginButton />}
        >
     
        
          <CartModal cartitem={this.props.cartitem} loading={this.props.loading} cartamount={this.props.cartamount} cartarray={this.props.cartarray}
            onClick={this.props.onClick} onDelete={this.props.onDelete}
          />
        </AppBar>
     
        {<SearchBar
          value={this.state.search}
          name='search'
          spellCheck={true}
          //dataSource={this.state.search}
          onChange={this.onChange}
          onRequestSearch={this.onsubmit}
          style={{
            margin: '0 auto',
            maxWidth: '100%',
            backgroundColor: '#344b70',
            color: 'black'
          }}
        />}
      </div>
    );
  }
}

export default Navbar;
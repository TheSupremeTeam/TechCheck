import React from 'react';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Avatar from 'material-ui/Avatar';
import Link from 'react-router-dom';

const loggedIn = (props) => {
  let {logout, ...newProps} = props;
  props = newProps;

  return (
  <IconMenu
    {...props}
    iconButtonElement={
      <IconButton><MoreVertIcon /></IconButton>
    }
    
    targetOrigin={{ horizontal: 'right', vertical: 'top' }}
    anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
  >
  {/* {console.log(props.userdata.userId)} */}

    <MenuItem href={`/profile/${props.userdata.userId}`}>


      {props.userdata.firstName + ' ' + props.userdata.lastName}
      <Avatar src={`${props.photoSource}${props.userdata.profilePic}`}
        size={30}
        style={{ display: 'in-line', margin: 'auto', position: 'relative', left: '16px', top: '7px' }}
      />
    </MenuItem>


    <MenuItem primaryText="My Products"
      href={`/user/products/${props.userdata.userId}`} />
    <MenuItem
      primaryText="Sign out"
      href='/' 
      onClick={logout}
     />
  </IconMenu>
)
};

loggedIn.muiName = 'IconMenu';

export default loggedIn;
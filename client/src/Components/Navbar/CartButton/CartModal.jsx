import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import logo from '../../../ic_shopping_cart_black_24px.svg';
import { Link } from 'react-router-dom';
import Popover, { PopoverAnimationVertical } from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import { Row, Col } from 'react-grid-system';
import Avatar from 'material-ui/Avatar/Avatar';
import SvgIcon from 'material-ui/SvgIcon';

const CancelIcon = (props) => (
    <SvgIcon {...props}>
        <svg fill="#FFFFFF" height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z" />
            <path d="M0 0h24v24H0z" fill="none" />
        </svg>
    </SvgIcon>
)

const style = {
    textAlign: 'center',
    marginTop: '20px',
}

class CartModal extends Component {
    state = {
        open: false,
        loading: false
    };
    componentDidMount = () => {
        if (this.props.cartarray.length > 1) {
            this.setState({
                loading: true
            })
        } else {
            this.setState({
                loading: false
            })
        }
    }
    componentWillReceiveProps = () => {
        if (this.props.cartarray.length > 1) {
            this.setState({
                loading: true
            })
        } else {
            this.setState({
                loading: false
            })
        }
    }
    handleClick = (event) => {
        // This prevents ghost click.
        event.preventDefault();

        this.setState({
            open: true,
            anchorEl: event.currentTarget,
        });
    };

    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };


    handleCheckOut = () => {
        if (this.props.cartitem === 0) {
         
            this.setState({ open: true });
        } else {
            this.setState({ open: false });
        }
    };

    static muiName = 'FlatButton';

    handleDelete = (k) => {
console.log(k,'hey')
        let newcartarray = this.state.cartarray.slice();
        let cartitemindex = newcartarray.indexOf(k);
        let cartamount = this.state.cartAmount - k.author;
        newcartarray.splice(cartitemindex, 1);
        let cartitem = this.state.cartItem - 1;

        this.setState({ cartarray: newcartarray, cartItem: cartitem, cartAmount: cartamount });
    };

    render() {

        const items = this.props.cartarray.map((step) => {
         
            return (
                <MenuItem key={step.productId} style={{ fontSize: '12px', textAlign: 'center' }}>
                    <Row>
                
                        <Col sm={4}>
                       
                            <Avatar  src={`https://s3-us-west-1.amazonaws.com/techcheckbucket/${step.photos[0].img1}`} style={{ position: 'relative', top: '10px', right: '5px' }} />
                        </Col>
                        <Col sm={6}>
                            <div style={{ position: 'relative', top: '4px', right: '12px' }}>
                                Price: {step.price} 
                            </div>
                        </Col>
                        <Col sm={2} onClick={() => this.props.onDelete(step.id,step.price, this.state)}  >
                            <CancelIcon style={{ position: 'relative', top: '14px', right: '10px' }} />
                        </Col>
                    </Row>
                </MenuItem>
            );
        });

        const actions = [

            <Link to='check_out'>
                <FlatButton
                    label="Check Out"
                    primary={true}
                    keyboardFocused={true}
                />
            </Link>,
        ];

        return (
            <div>
               
                <div>
                    <FlatButton {...this.props} title='cart' style={style} onClick={this.handleClick} >
                        <img src={logo} alt="shopping cart" /> <span style={{ position: 'relative', bottom: '11px', left: '-20.5px', color: 'white' }}> {this.props.cartitem}</span>
                    </FlatButton>
                </div>
                <Row >
                    <Col sm={12} >
                        <div>
                            <Popover
                                actions={actions}
                                open={this.state.open}
                                anchorEl={this.state.anchorEl}
                                anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                                targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                                onRequestClose={this.handleRequestClose}
                                animation={PopoverAnimationVertical}
                                style={{ maxWidth: '50%' }}
                            >
                                <Menu>
                                    <Row>
                                        <Col sm={4}>
                                            <div style={{ textAlign: 'center', }}>
                                                <img src={logo} alt="shopping cart" style={{ position: 'relative', top: '3px', left: '10px' }} />
                                                <span style={{ position: 'relative', bottom: '12px', left: '-11px', color: 'white' }}> {this.props.cartitem}</span>
                                            </div>

                                        </Col>
                                        <Col sm={8}>
                                            <div style={{ position: 'relative', top: '3px', left: '10px' }}>
                                                Amount : ${this.props.cartamount}
                                            </div>
                                        </Col>
                                        <Divider />

                                    </Row>

                                    <div className='BoughtProducts'>
                                        {items}
                                    </div>
                                </Menu>
                                <div style={{ textAlign: 'center', padding: '10px 0', }}>
                                    <Link to='/check_out'> <FlatButton style={{ backgroundColor: '#92B558' }} onClick={this.handleCheckOut}>Check Out</FlatButton></Link>
                                </div>
                            </Popover>
                        </div>
                    </Col>
                </Row>
            </div>

        );
    }
}

export default CartModal;
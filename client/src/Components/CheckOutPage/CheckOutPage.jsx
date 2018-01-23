import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import './CheckOutPage.css';
import Paper from 'material-ui/Paper'
import PayPalButton from './PayPalButton/PayPalButton';
import { Row, Col } from 'react-grid-system';
import Divider from 'material-ui/Divider';



class checkOutPage extends Component {
    state = {
        cartamount: 0,
        cartArray: [],
        cartitem: '',
        noProducts:false,
        loggedIn:false
       
            
    }
    componentDidMount = () => {
 
        
        console.log(this.props.cartarray)
        if(this.props.cartamount !=0){
this.setState({
    noProducts:false
})
        }
    }
// componentDidUpdate=()=>{
   
    componentDidReceiveProps = () => {
        if(this.props.thisUser!=null){
            this.setState({
                loggedIn:true
            })
        }
    
        let tax = (9 / 100) * this.props.cartamount
    }

    deleteProductHandler = (id) => {
        const ogProductList = this.props.cartArray;
        ogProductList.splice(id, 1);
        const updatedProductList = ogProductList;
        this.setState({
            dummyData: updatedProductList
        })
        console.log(this.state.dummyData);
    }


    render() {
        return (
            <div className='CheckOutPage'>
                {console.log(this.props.cartarray)}
                <div>
                    <h1 style={{ backgroundColor: '#005960', margin: '0px', padding: '25px 0', borderTop: '1px solid white', color: 'white' }}>CHECKOUT</h1>
                </div>

                <Row>
                    <Col sm={9}>
                        {this.props.cartarray.map((card, id) => (
                            <Paper
                                zDepth={5}
                                className='ProductPaper'
                                key={card.id}
                            >
                                {console.log(card.photos[0])}
                                <div className='ImageSection'>
                                    <img className='ProductPic' src={`https://s3-us-west-1.amazonaws.com/techcheckbucket/${card.photos[0].img1}`} alt="" />
                                </div>
                                <div className='DescribeProduct' style={{fontSize: '10px'}}>
                                    Name: {card.productName}
                                    <Divider style={{ margin: '15px 0' }} />
                                    Price : {card.price}
                                    <Divider style={{ margin: '15px 0' }} />
                                </div>
                                {/* () => this.deleteProductHandler(id) */}
                                <FlatButton
                                    label='Remove'
                                    onClick={() => this.props.handleDelete(card.price,  this.props)}
                                    style={
                                        {
                                            backgroundColor: '#DC4C46',
                                            position: 'relative',
                                            bottom: '-21%',
                                            right: '0px',
                                            marginRight: '15px',
                                            textAlign: 'center'
                                        }
                                    }
                                />
                            </Paper>
                        ))}
                    </Col>
                    <Col sm={3}>
                        <Paper zDepth={5} className='PlaceOrderDiv'>
                            <Row>
                                <Col sm={12} style={{ textAlign: 'center', padding: '20px 0' }}>
                                 
                                       Amount :$  
                                       { this.props.cartamount }
                                </Col>
                                <Col sm={12} style={{ textAlign: 'center', padding: '20px 0' }}>
                                    Tax: ${Math.floor((9 / 100) * this.props.cartamount)}
                                </Col>
                                <Col sm={12} style={{ textAlign: 'center', padding: '20px 0' }}>
                                    Total Amount:${((9 / 100) * this.props.cartamount) + this.props.cartamount}
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={12}>
                                {this.state.loggedIn ?
                                  <p>'PLease Log In To make a purchases' </p> : <PayPalButton style={{ padding: '15px' }} cartamount={this.props.cartamount} {...this.props}/>}
                                </Col>
                            </Row>
                        </Paper>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default checkOutPage;
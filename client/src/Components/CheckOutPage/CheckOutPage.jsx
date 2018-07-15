import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import './CheckOutPage.css';
import Paper from 'material-ui/Paper'
import PayPalButton from './PayPalButton/PayPalButton';
import { Row, Col } from 'react-grid-system';
import Divider from 'material-ui/Divider';



class checkOutPage extends Component {
    state = {
     
      
       
            
    }

 

   

    deleteProductHandler = (id) => {
        const ogProductList = this.props.cartArray;
        ogProductList.splice(id, 1);
        const updatedProductList = ogProductList;
        this.setState({
            dummyData: updatedProductList
        })
        
    }



    render() {
   
   let payPal=null;
 if(this.props.logged===true&&this.props.cartitem>=1){
 payPal= <PayPalButton style={{ padding: '15px' }} cartamount={this.props.cartamount} {...this.props}/> }
 else if(this.props.logged==true&&this.props.cartitem==0){
    payPal=<p>Please add items to your shooping cart to check out</p>;
 }else if(this.props.logged==false){
    payPal=  <p>Please log in to make a purchase</p>
 }
        return (
            <div className='CheckOutPage'>
              
                <div>
                    <h1 style={{ backgroundColor: '#005960', margin: '0px', padding: '25px 0', borderTop: '1px solid white', color: 'white' }}>CHECKOUT</h1>
                </div>

                <Row>
                    <Col sm={9}>
                  
                        {this.props.cartarray.map((card, id) => (
                         
                            <Paper
                                zDepth={5}
                                className='ProductPaper'
                                key={card.productId}
                            >
                                 { console.log(card)}
                                <div className='ImageSection'>
                                    <img className='ProductPic' src={`https://s3-us-west-1.amazonaws.com/techcheckbucket/${card.photos[0].img1}`} alt="" />
                                </div>
                                <div className='DescribeProduct' style={{fontSize: '15px'}}>
                                    Name: {card.productName}
                                    <Divider style={{ margin: '15px 0' }} />
                                    Price : {card.price}
                                    <Divider style={{ margin: '15px 0' }} />
                                </div>
                              
                                <FlatButton
                                    label='Remove'
                                    onClick={() => this.props.handleDelete(card.id)}
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
                                       { (this.props.cartamount).toFixed(2) }
                                </Col>
                                <Col sm={12} style={{ textAlign: 'center', padding: '20px 0' }}>
                                    Tax: ${((9 / 100) * this.props.cartamount).toFixed(2)}
                                </Col>
                                <Col sm={12} style={{ textAlign: 'center', padding: '20px 0' }}>
                                    Total Amount:${(((9 / 100) * this.props.cartamount) + this.props.cartamount).toFixed(2)}
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={12}>
                                {payPal}
                             
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
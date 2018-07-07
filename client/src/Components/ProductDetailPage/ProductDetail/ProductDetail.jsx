import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import { GridList, GridTile } from 'material-ui/GridList';
import { List, ListItem } from 'material-ui/List';
import products1 from '../../Data/products-api'
import { Row, Col, Container } from 'react-grid-system';
import Divider from 'material-ui/Divider';
import SvgIcon from 'material-ui/SvgIcon';

const CartIcon = (props) => (
  <SvgIcon {...props}>
    <svg fill="#FFFFF" height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 0h24v24H0zm18.31 6l-2.76 5z" fill="none" />
      <path d="M11 9h2V6h3V4h-3V1h-2v3H8v2h3v3zm-4 9c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zm-9.83-3.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.86-7.01L19.42 4h-.01l-1.1 2-2.76 5H8.53l-.13-.27L6.16 6l-.95-2-.94-2H1v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.13 0-.25-.11-.25-.25z" />
    </svg>
  </SvgIcon>
)

class productDetail extends Component {

    constructor(props) {
        super(props)
        this.state = {
            productId: "",
            userId: "",
            productName: "",
            serialNumber: "",
            category: "",
            price: "",
            productDescription: "",
            condition: "",
            warranty: "",
            packaging: "",
            photos: [],
            verified: false,
            status: "",
            createdAt: "",
           
        }
    }
    
    componentDidMount = () => {
        console.log('product detail')
        console.log(this.props);
        products1.Product(this.props.match.params.id).then(data => {
            console.log(data)
            const photosImg = {
                img1: data.data.userUploadImage1,
                
            }

            const imgs = [
                photosImg,
            ]
            console.log(data.data.verified)
            let sold;
            if (data.data.status==='sold'){
                sold='Sold'
            }
            let used;
            if(data.data.condition=='old'){
used='Used'
            }
            let true1;
            if(data.data.verified==true){
true1='True'
            }else{
                true1='False'
            }
            this.setState({
                photos: imgs,
                productId: data.data.id,
                userId: data.data.userId,
                productName: data.data.productName,
                serialNumber: data.data.serialNumber,
                category: data.data.category,
                price: data.data.price,
                productDescription: data.data.productDescription,
                condition:used|| data.data.condition,
                warranty: data.data.warranty,
                packaging: data.data.packaging,
                verified: true1||data.data.verified,
                status: sold||data.data.status,
                createdAt: data.data.createdAt
            })
        })
    }
    render() {
        console.log(this.state.verified);
        console.log(this.props);
        return (
            <div>
                <br/>
                <Container>
                    <Paper>
                        <Row>
                            <Col sm={6}>
                                <GridList
                                cellHeight={300}
                                cols={1}
                                padding={5}
                                >
                                {/* {console.log(this.state.photos)} */}
                                    {this.state.photos.map((tile) => (
                                    <GridTile
                                        key={tile.img}
                                    >
                                        <div style={{margin: '10px', width: '430px', height: '270px', maxHeight: '100%', maxWidth: '93%'}}>
                                            <img src={`https://s3-us-west-1.amazonaws.com/techcheckbucket/${tile.img1}`} alt='productimage' style={{height: '100%', width: '100%', border: '1px solid red'}} />
                                        </div>
                                    </GridTile>
                                ))}
                                </GridList>
                            </Col>
                            <Col sm={6} >
                                <div style={{ margin: 'auto 30px auto 10px', maxWidth: '100%', maxHeight: '100%', height: '95%'}}>
                                <h3 style={{textAlign: 'center'}}>{this.state.productName}</h3>
                                <Divider/>
                                <p style={{textAlign: 'left'}}>Product Description : {this.state.productDescription}</p>
                                </div>
                            </Col>
                       
                        </Row>
                    </Paper>
                    <Paper >
                        <Row style={{margin: '10px 0px'}}>
                            <Col sm={6}>                 
                                <List>
                                    <ListItem>Price :${this.state.price} </ListItem>
                                    <Divider/>
                                    <ListItem>Category : {this.state.category}</ListItem>
                                    <Divider/>
                                    <ListItem>Condition : {this.state.condition}</ListItem>
                                    <Divider/>
                                    <ListItem>Warranty : {this.state.warranty}</ListItem>
                                    <Divider/>
                                </List>                   
                            </Col>
                            <Col sm={6}>
                                <List>
                                    <ListItem>Packaging : {this.state.packaging}</ListItem>
                                    <Divider/>
                                    <ListItem>Serial Number : {this.state.serialNumber}</ListItem>
                                    <Divider/>
                                    <ListItem>Verified : {this.state.verified}</ListItem>
                                    <Divider/>
                                    <ListItem>Product Status : {this.state.status}</ListItem>
                                    <Divider/>
                                </List>                     
                            </Col>                       
                        </Row>
                        <div style={{ marginBottom: '60px', padding: '40px', }}>
                            <FlatButton
                                icon={<CartIcon />}
                                primary={true}
                                style={{width: '30%', backgroundColor: 'white' }}
                                onClick={() => this.props.onClick(this.state.price,  this.state)} />
                        </div>
                    </Paper>
                </Container>
            </div>
        );
    }
}

export default productDetail;
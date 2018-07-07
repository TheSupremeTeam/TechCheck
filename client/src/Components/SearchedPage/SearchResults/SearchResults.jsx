import React, { Component } from 'react';
import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import productsApi from '../../Data/products-api'
import axios from "axios";
import SvgIcon from 'material-ui/SvgIcon';

const CartIcon = (props) => (
  <SvgIcon {...props}>
    <svg fill="#FFFFF" height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 0h24v24H0zm18.31 6l-2.76 5z" fill="none" />
      <path d="M11 9h2V6h3V4h-3V1h-2v3H8v2h3v3zm-4 9c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zm-9.83-3.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.86-7.01L19.42 4h-.01l-1.1 2-2.76 5H8.53l-.13-.27L6.16 6l-.95-2-.94-2H1v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.13 0-.25-.11-.25-.25z" />
    </svg>
  </SvgIcon>
)


const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    border: '1px solid grey',
    justifyContent: 'space-around',
    width: '100%',
    padding: '20px auto',
  },
  gridList: {
    width: '90%',
    height: '100%',
    overflowY: 'auto',
  },

};



/**
 * A simple example of a scrollable `GridList` containing a [Subheader](/#/components/subheader).
 */
class ProductSearch extends Component {
  state = {
    products: [],
    pages: 0,
    limit: 15,
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

            verified: "",
            status: "",
            createdAt: ""
          
  }
  componentDidMount = () => {

   
    axios({
      method: 'post',
      url: `/api/products/category`,
      data: {
        category: this.props.match.params.category,
        page: 0,
        limit: 15

      }
    })
      .then(products => {
        console.log(products)
        this.setState({
          products: products.data,

        })
      })
  }
 
  console = () => {
    console.log(this.state.page)
    axios({
      method: 'post',
      url: `/api/products/category`,
      data: {
        category: this.props.match.params.category,
        page: this.state.page,
        limit: this.state.limit

      }
    }).then(next => {
      console.log(next)
      this.setState({
        products: next.data
      }, console.log(this.state.products))

    })
  }
  limit = (e) => {

    console.log(e.currentTarget.attributes.value.nodeValue)
    this.setState({

      limit: e.currentTarget.attributes.value.nodeValue
    }, this.console)


  }
  pages = (e) => {


    this.setState({
      page: e.currentTarget.attributes.value.nodeValue,

    }, this.console)


  }
  productDetail=()=>{
    console.log(this.state.productId)
    window.location=`/product_detail/${this.state.productId}`
  }
  getProductId=(e)=>{
    this.setState({
  productId:e.currentTarget.attributes.value.nodeValue
    }, this.productDetail)
   
  }
  getProductId2=(e)=>{
    this.setState({
  productId:e.currentTarget.attributes.value.nodeValue
    },this.CartBackend)
  }
  
  addToCart=()=>{
    this.props.onClick(this.state.price, this.state);
  }
  
  getItemData=(e)=>{
    console.log(this.props)
    productsApi.Product(this.state.productId).then(data => {
      console.log(data)
      const photosImg = {
          img1: data.data.userUploadImage1,
          
      }
      const photosImg2 = {
          img2: data.data.userUploadImage2,

      }
      const imgs = [
          photosImg,
          photosImg2
      ]
      this.setState({
          photos: imgs,
          productId: data.data.id,
          userId: data.data.userId,
          productName: data.data.productName,
          serialNumber: data.data.serialNumber,
          category: data.data.category,
          price: data.data.price,
          productDescription: data.data.productDescription,
          condition: data.data.condition,
          warranty: data.data.warranty,
          packaging: data.data.packaging,
          verified: data.data.verified,
          status: data.data.status,
          createdAt: data.data.createdAt
      },)
      
  })
  console.log(this.state.productId)
}
UpdateCart=()=>{
  console.log('i am here ')
  productsApi.CheckCart(this.props.UserId).then(data => {
console.log(data)
  })
}
  CartBackend=()=>{
 
    axios({
      method: 'post',
      url: `/api/products/cart`,
      data: {
        Product: this.state.productId,
        user:this.props.UserId

      }
    }).then(next => {
      this.UpdateCart();
    })
  }
  render() {

    return (
      <div style={styles.root}>
        <p>Results per page:</p>
        <button onClick={this.limit} value={15}>15</button><button onClick={this.limit} value={30}>30</button>
        <GridList
          cellHeight={180}
          style={styles.gridList}
          cols={4}
          padding={10}
        >

          {this.state.products.map((tile) => (
            <GridTile
              key={tile.id}
              title={tile.productName}
              price={tile.price}
              style={{maxHeight: '100%', maxWidth: '100%', border: '1px solid grey', fontSize: '10px'}}
              subtitle={<span>Price <b>{tile.price}</b></span>}
              actionIcon={<IconButton><CartIcon value={tile.id} onClick={this.getProductId2}/></IconButton>}
              titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
            >
              <img value={tile.id}
          onClick={this.getProductId} src={`https://s3-us-west-1.amazonaws.com/techcheckbucket/${tile.userUploadImage1}`} alt='Searched Products' />
            </GridTile>
          ))}<br />
          <div className='pages'>
            <button onClick={this.pages} name='1' value={0} >1</button><button onClick={this.pages} name='2' value={15} >2</button> <button onClick={this.pages} name='3' value={30} >3</button> <button onClick={this.pages} value={45} >4</button> <button onClick={this.pages} value={60} >5</button>
          </div>
        </GridList>
      </div>
    )
  }
}

export default ProductSearch;
import React, { Component } from 'react';
// Import routing components
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MainPage from './Components/MainPage/MainPage';
import Footer from './Components/Footer/Footer';
import SearchedPage from './Components/SearchedPage/SearchedPage';
import ProductDetailPage from './Components/ProductDetailPage/ProductDetailPage';
import {Container} from 'react-grid-system';
import CheckOutPage from './Components/CheckOutPage/CheckOutPage';
import RegisterUser from './Components/Register/RegisterUser';
import SellProduct from './Components/Sell/SellProduct';
import { UserProfile, UserProducts, verification, reset, resetPassword, emailSent, confirmation } from './Components/usersPages/index'
import Search from '../src/Components/SearchedPage/SearchResults/search'
import axios from "axios";
import Receipt from '../src/Components/CheckOutPage/Receipt'
import cartApi from '../src/Components/Data/products-api'
import {List, ListItem} from 'material-ui/List';
import MobileTearSheet from '.'
import Divider from 'material-ui/Divider';
class App extends Component {
    state = {
        cartItem: 0,
        cartAmount: 0,
        cartarray: [],
        userDataObj: {},
        theId: '',
        logged: false,
        userInput: '',
        userCreatedAt:'',
        thePhotoSource: "https://s3-us-west-1.amazonaws.com/techcheckphotos/",
        dataSource:'',
        TimeOfDate:false,
        loadingCart:false

    };


    componentDidMount = () => {
     let theuser;
        if (sessionStorage.auth != null) {
            // console.log('auth')

            axios({
                method: 'post',
                url: '/api/users/auth',
                data: {
                    userToken: sessionStorage.getItem('auth')

                },
            }).then(user => {
                if (user != null) {
                    //console.log(user)
             console.log(user)
            
                    this.setState({
                        logged: true,
                        userDataObj: {
                            email:user.data.email,
                            profilePic: user.data.profilePic, userId: user.data.id, firstName: user.data.firstName,
                            lastName: user.data.lastName, active: user.data.active, verified: user.data.verified
                        },
                       theId: user.data.id,
                       userCreatedAt:user.data.createdAt


                    },this.CheckCartOnLoad)
                  
                    // console.log(this.state.userDataObj)
                    // console.log(this.state.theId);
                } else {
                  
                }
            })
        }

       
        
   
    }
    changePhotoSource=(dataSource)=>{
        
        const monthsArray=['01','02','03','04','05','06'];
        let dateSplit=  this.state.userCreatedAt.split(' ');
    
       for(let i=0;i<monthsArray.length;i++){
         
         if(dateSplit[0]==monthsArray[i]&&dateSplit[2]=='2018'){
          
      return true
         }
       }
 
//    console.log( dateSplit)
    }
    addingToCarNotSignedIn = (i, j) => {
        console.log(i)
        console.log(j)
        let cartitem = this.state.cartItem + 1;
        let cartamount = this.state.cartAmount + i;
        let newcartarray = this.state.cartarray.concat(j);
        this.setState({ cartItem: cartitem, cartAmount: cartamount, cartarray: newcartarray });
       

        localStorage.setItem('CartItem', cartitem);
        localStorage.setItem('CartAmount', cartamount);
        localStorage.setItem('cartarray', JSON.stringify(newcartarray));

    };
     CheckCartOnLoad =(noItems) =>{
let changeSource =this.changePhotoSource(this.state.userCreatedAt);
if(changeSource===true){
    this.setState({
        thePhotoSource:"https://s3-us-west-1.amazonaws.com/techcheckbucket/"
      })
}

        // if(localStorage.getItem('cartarray')==null){
            
            cartApi.CheckCart(this.state.theId).then(data => {
               
            //   if(data.data.length !==0){
                                        console.log('i am inyour mnom')
                                        let numberOf=data.data.length
                                        let priceArray=[];
                                for(let i=0;i<numberOf;i++){
                                
                                  priceArray.push(data.data[i].price);
                                }
                                // console.log(priceArray)
                                let cartamount = 0;
                                for (let i = 0; i < priceArray.length; i++) {
                                  cartamount += priceArray[i]
                                }
                                
                                
                                        let cartitem = data.data.length;
                                        this.setState({
                                            cartItem:data.data.length,
                                            cartarray:data.data
                                        })
                                     
                                        let newcartarray = data.data;
                                        this.setState({ cartItem: cartitem, cartAmount: cartamount, cartarray: newcartarray });
                                       
                                
                                        localStorage.setItem('CartItem', cartitem);
                                        localStorage.setItem('CartAmount', cartamount);
                                        localStorage.setItem('cartarray', JSON.stringify(newcartarray));
                                    // } 
                                    // else if(data.length==0&&data.length >0){
                                    //     this.setState({ cartarray: [] });
                                    // }
                                }).catch(err=>console.log(err))
                            
            // }
          
    //    if(localStorage.getItem('CartItem') !== this.state.cartitem){
        cartApi.CheckCart(this.state.theId).then(data => {
        
          if(data.data.length !==0){
                                  
                                    let numberOf=data.data.length
                                    let priceArray=[];
                            for(let i=0;i<numberOf;i++){
                            
                              priceArray.push(data.data[i].price);
                            }
                            // console.log(priceArray)
                            let cartamount = 0;
                            for (let i = 0; i < priceArray.length; i++) {
                              cartamount += priceArray[i]
                            }
                           
                            
                                    let cartitem = data.data.length;
                                    this.setState({
                                        cartItem:data.data.length,
                                        cartarray:data.data
                                    })
                                    // console.log(cartitem)
                               
                                    let newcartarray = data.data;
                                    this.setState({ cartItem: cartitem, cartAmount: cartamount, cartarray: newcartarray });
                                   
                            
                                    localStorage.setItem('CartItem', cartitem);
                                    localStorage.setItem('CartAmount', cartamount);
                                    localStorage.setItem('cartarray', JSON.stringify(newcartarray));
                                } else if(data.length==0&&data.length >0){
                                    this.setState({ cartarray: [] });
                                }
                            }).catch(err=>console.log(err))
       
            
                if (localStorage.getItem('CartItem')) {
                    this.setState({ cartItem: parseInt(localStorage.getItem('CartItem')) });
                }
        
                if (localStorage.getItem('CartAmount')) {
                    this.setState({ cartAmount: parseInt(localStorage.getItem('CartAmount')) });
                }
        
                if (localStorage.getItem('cartarray')) {
                    if (localStorage.getItem('cartarray').length == 0) {
                        this.setState({ cartarray: [] });
                    } else {
                        const tmp = JSON.parse(localStorage.getItem('cartarray'));
                       // const tmp = []; //JSON.parse(null);
                        this.setState({ cartarray: tmp });
                    }
                }
    }
    UpdateCartOnLoad=()=>{
        if (localStorage.getItem('CartItem')) {
            this.setState({ cartItem: parseInt(localStorage.getItem('CartItem')) });
        }

        if (localStorage.getItem('CartAmount')) {
            this.setState({ cartAmount: parseInt(localStorage.getItem('CartAmount')) });
        }
    }
    handleLoggedChange = (event, logged) => {
        this.setState({ logged: logged });
    };


    logOutHandler = () => {
        this.setState({ logged: false });
        sessionStorage.removeItem('auth');
        localStorage.clear();
    }

    userInputHandlerlogged = (event) => {
        this.setState({ userInput: event.target.value })
    }

    handleClick = (cartStuff) => {
       
    

        let numberOf=cartStuff.data.length
        let priceArray=[];
for(let i=0;i<numberOf;i++){

  priceArray.push(cartStuff.data[i].price);
}

let cartamount = 0;
for (let i = 0; i < priceArray.length; i++) {
  cartamount += priceArray[i]
}

let cartitem = cartStuff.data.length;
this.setState({
    cartItem:cartStuff.data.length,
    cartarray:cartStuff.data
})


let newcartarray = cartStuff.data;
        this.setState({ cartItem: cartitem, cartAmount: cartamount, cartarray: newcartarray });
       

        localStorage.setItem('CartItem', cartitem);
        localStorage.setItem('CartAmount', cartamount);
        localStorage.setItem('cartarray', JSON.stringify(newcartarray));

    };

    handleDelete =async (productId,amount, k) => {
        console.log(productId)
        let theData =null;
        if(theData===null){
            this.setState({
                loadingCart:true
            })
        }
        if(this.state.theId != null){
            console.log('here in your moms ')
 theData= await axios({
    method: 'post',
    url: '/api/products/delete/cart',
    data: { user:this.state.theId,
        product:productId
       

    }
        })
        console.log(theData)
        if(theData.data==='product Deleted'){
            this.setState({
                loadingCart:false
            })
         cartApi.CheckCart(this.state.theId).then(data => {
          
                let numberOf=data.data.length
                let priceArray=[];
        for(let i=0;i<numberOf;i++){
        
          priceArray.push(data.data[i].price);
        }
        // console.log(priceArray)
        let cartamount = 0;
        for (let i = 0; i < priceArray.length; i++) {
          cartamount += priceArray[i]
        }
       
        
                let cartitem = data.data.length;
                this.setState({
                    cartItem:data.data.length,
                    cartarray:data.data
                })
                // console.log(cartitem)
           
                let newcartarray = data.data;
                this.setState({ cartItem: cartitem, cartAmount: cartamount, cartarray: newcartarray });
          
        
                localStorage.setItem('CartItem', cartitem);
                localStorage.setItem('CartAmount', cartamount);
                localStorage.setItem('cartarray', JSON.stringify(newcartarray));
    })
}
        }
        else{

      
        let newcartarray = this.state.cartarray.slice();
        let cartitemindex = newcartarray.indexOf(k);
        let cartamount = this.state.cartAmount-parseInt(amount);


        newcartarray.splice(cartitemindex, 1);
        let cartitem = this.state.cartItem - 1;
       
        this.setState({ cartarray: newcartarray, cartItem: cartitem, cartAmount: cartamount });
   
        localStorage.setItem('CartItem', cartitem);
        localStorage.setItem('CartAmount', cartamount);
        localStorage.setItem('cartarray', JSON.stringify(newcartarray));
         if(localStorage.getItem('CartItem')=='0'){
            localStorage.clear()
            this.setState({
                cartAmount:0
            })
        }else if(localStorage.getItem('CartItem')<0){
            this.setState({
                cartItem: 0,
                cartAmount: 0,
                cartarray: [],
            })
        }
     }
    };

    render() {
      

        /* below Routed.... components are created to pass down props to routed component */
        const RoutedMainPage = (props) => {
            return (
                <MainPage component={MainPage}
                    cartitem={this.state.cartItem}
                    cartamount={this.state.cartAmount}
                    cartarray={this.state.cartarray}
                    onClick={this.handleClick} 
                    photoSource={this.state.dataSource}
                    {...props }
                />
            );
        }
            //console.log(this.state.theId);
            let tmpid=this.state.theId;

        const RoutedProfilePage = (props) => {
            //console.log(this.state.theId);
             return (
                
                <UserProfile theuserid={this.state.theId} photoSource={this.state.thePhotoSource} component={UserProfile} {...props}/>
            )
        }
        const RoutedProductDetailPage = (props) => {
            return (
                <ProductDetailPage
                UserId={this.state.theId}
                    component={ProductDetailPage}
                    cartitem={this.state.cartItem}
                    cartamount={this.state.cartAmount}
                    cartarray={this.state.cartarray}
                    onClick={this.handleClick}
                    NotSignedIn={this.addingToCarNotSignedIn} {...props }
                />
            );
        }

        const RoutedCheckOutPage = (props) => {
            
            return ( 
                <CheckOutPage
                logged={this.state.logged}
                    component={CheckOutPage}
                    cartitem={this.state.cartItem}
                    cartamount={this.state.cartAmount}
                    cartarray={this.state.cartarray}
                    handleDelete={this.handleDelete}
                    thisUser={this.state.userDataObj}
                    {...props}
                    
                />
            )
        }

        const RoutedSearchedPage = (props) => {
            return ( 
                <SearchedPage
                UserId={this.state.theId}
                    component={CheckOutPage}
                    cartitem={this.state.cartItem}
                    cartamount={this.state.cartAmount}
                    cartarray={this.state.cartarray}
                    onClick={this.handleClick} {...props }
                />
            )
        }

        const RoutedSearch = (props) => {
            return ( 
                <Search
                UserId={this.state.theId}
                    component={CheckOutPage}
                    cartitem={this.state.cartItem}
                    cartamount={this.state.cartAmount}
                    cartarray={this.state.cartarray}
                    onClick={this.handleClick}
                    NotSignedIn={this.addingToCarNotSignedIn}
                    handleDelete={this.handleDelete} {...props }
                />
            )
        }

        return (
            <Container fluid={false} >
           
            <BrowserRouter>
                <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)} >
                    <div className="App" >
                    

                        <Navbar 
                     loading={this.state.loadingCart}
                        photoSource={this.state.thePhotoSource}
                        userdata={this.state.userDataObj}
                            dataSource={this.state.dataSource}
                            userInput={this.state.userInput}
                            loggedInput={this.userInputHandlerlogged}
                            loginFunction={this.handleLoggedChange}
                            logged={this.state.logged}
                            logoutFunction={this.state.logged ? this.logOutHandler : null}
                            cartitem={this.state.cartItem}
                            cartamount={this.state.cartAmount}
                            cartarray={this.state.cartarray} 
                            onDelete={this.handleDelete}
                            {...this.props}
                             />

                        
                        <Switch>
                            <Route exact path='/' render={RoutedMainPage} />
                            <Route exact path='/api/users/verification/:id' component={verification} />
                            <Route path='/check_out' render={RoutedCheckOutPage} />
                            <Route path='/product_detail/:id' render={RoutedProductDetailPage} />
                            <Route path='/search_results/:category' render={RoutedSearchedPage} />
                            <Route path='/registration' component={RegisterUser} />
                            <Route path='/sell_product/:id' component={SellProduct} />
                            <Route path='/profile/:id' render={RoutedProfilePage} />
                            <Route path='/acount/recovery' component={reset} />
                            <Route path='/sent' component={emailSent} />
                            <Route path='/reset/:id' component={resetPassword} />
                            <Route path='/confirmation/reset' component={confirmation} />
                            <Route path='/user/products/:id' component={UserProducts} />
                            <Route path='/searchResults/:search' render={RoutedSearch}/>
                            <Route path='/receipt/:order' component={Receipt}/>
                        </Switch>
                        <Footer />
                    </div>
                </MuiThemeProvider>
            </BrowserRouter>
            </Container>
        );
    }
}


export default App;
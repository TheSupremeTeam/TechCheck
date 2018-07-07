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
        dataSource: ''
    };


    componentDidMount = () => {

    
        // if (localStorage.getItem('CartItem')) {
        //     this.setState({ cartItem: parseInt(localStorage.getItem('CartItem')) });
        // }

        // if (localStorage.getItem('CartAmount')) {
        //     this.setState({ cartAmount: parseInt(localStorage.getItem('CartAmount')) });
        // }

        // if (localStorage.getItem('cartarray')) {
        //     if (localStorage.getItem('cartarray').length == 0) {
        //         this.setState({ cartarray: [] });
        //     } else {
        //         const tmp = JSON.parse(localStorage.getItem('cartarray'));
        //        // const tmp = []; //JSON.parse(null);
        //         this.setState({ cartarray: tmp });
        //     }
        // }

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
                    this.setState({
                        logged: true,
                        userDataObj: {
                            email:user.data.email,
                            profilePic: user.data.profilePic, userId: user.data.id, firstName: user.data.firstName,
                            lastName: user.data.lastName, active: user.data.active, verified: user.data.verified
                        },
                       theId: user.data.id


                    })
                    // console.log(this.state.userDataObj)
                    // console.log(this.state.theId);
                } else {
                    console.log('no token')
                    console.log('here auth failed')
                }
            })
        }
        // [{"products":[{"id":"d623f7c9-fd81-11e7-9a91-0a2645a02380","userId":"35322927-4208-456d-a733-f911b03fa546",
        // "productName":"GIGABYTE Z370 AORUS GAMING WIFI (rev. 1.0) LGA 1151 (300 Series) Intel Z370 HDMI SATA 6Gb/s USB 3.1 ATX Intel Motherboard","serialNumber":" N82E16813145043","category":"MotherBoard","price":126,"productDescription":"\n            Memory Standard: DDR4 4000(O.C.)/ 3866(O.C.)/ 3800(O.C.)/ 3733(O.C.)/ 3666(O.C.)/ 3600(O.C.)/ 3466(O.C.)/ 3400(O.C.)/ 3333(O.C.)/ 3300(O.C.)/ 3200(O.C.)/ 3000(O.C.)/ 2800(O.C.)/ 2666/ 2400/ 2133Number of Memory Slots: 4×288pinAudio Chipset: C","condition":"new","warranty":"no","packaging":"no","userUploadImage1":"13-145-043-V06.jpg","userUploadImage2":null,"verified":false,"status":"available","createdAt":"2018-01-20T01:32:54.000Z","updatedAt":"2018-01-20T01:32:54.000Z"},{"id":"d632e602-fd81-11e7-9a91-0a2645a02380","userId":"a5c2cd7b-93bf-483b-b943-02bf7cd3428c","productName":"ASUS Prime Z370-A LGA 1151 (300 Series) Intel Z370 HDMI SATA 6Gb/s USB 3.1 ATX Intel Motherboard","serialNumber":" N82E16813119038","category":"MotherBoard","price":141,"productDescription":"\n            Memory Standard: DDR4 4000(O.C)*/ 3866(O.C.)*/ 3733(O.C.)*/ 3600(O.C.)*/ 3466(O.C.)*/ 3400(O.C.)*/ 3333(O.C.)*/ 3300(O.C.)*/ 3200(O.C.)*/ 3000(O.C.)*/ 2800(O.C.)*/ 2666/ 2400/ 2133\n* Hyper DIMM support is subject to the physical characteristi","condition":"old","warranty":"yes","packaging":"yes","userUploadImage1":"13-119-038-V01.jpg","userUploadImage2":null,"verified":true,"status":"available","createdAt":"2018-01-20T01:32:54.000Z","updatedAt":"2018-01-20T01:32:54.000Z"},{"id":"d649501d-fd81-11e7-9a91-0a2645a02380","userId":"35322927-4208-456d-a733-f911b03fa546","productName":"ASUS Prime Z370-P LGA 1151 (300 Series) Intel Z370 HDMI SATA 6Gb/s USB 3.1 ATX Intel Motherboard","serialNumber":" N82E16813119039","category":"MotherBoard","price":117,"productDescription":"\n            Memory Standard: DDR4 4000(O.C.)*/ 3866(O.C.)*/ 3733(O.C.)*/ 3600(O.C.)*/ 3466(O.C.)*/ 3400(O.C.)*/ 3333(O.C.)*/ 3300(O.C.)*/ 3200(O.C.)*/ 3000(O.C.)*/ 2800(O.C.)*/ 2666/ 2400/ 2133\n*The maximum memory frequency supported varies by processorN","condition":"old","warranty":"yes","packaging":"yes","userUploadImage1":"13-119-039-V04.jpg","userUploadImage2":null,"verified":true,"status":"sold","createdAt":"2018-01-20T01:35:14.000Z","updatedAt":"2018-01-20T01:35:14.000Z"},{"id":"d658f080-fd81-11e7-9a91-0a2645a02380","userId":"b27abfc6-60c1-4569-ab17-650114bc6754","productName":"ASUS ROG STRIX B350-F GAMING AM4 AMD B350 SATA 6Gb/s USB 3.1 HDMI ATX AMD Motherboard","serialNumber":" N82E16813132988","category":"MotherBoard","price":109,"productDescription":"\n            Number of Memory Slots: 4×288pinMemory Standard: Ryzen Processors: DDR4 3200(O.C.)/ 2933(O.C.)/ 2666/ 2400/ 2133 *\n7th Generation A-series/Athlon Processors: DDR4 2400/ 2133 *\n* Hyper DIMM support is subject to the physical characteristics of","condition":"old","warranty":"no","packaging":"no","userUploadImage1":"13-132-988-V01.jpg","userUploadImage2":null,"verified":true,"status":"sold","createdAt":"2018-01-20T01:35:14.000Z","updatedAt":"2018-01-28T22:53:44.000Z"},{"id":"d666937b-fd81-11e7-9a91-0a2645a02380","userId":"b27abfc6-60c1-4569-ab17-650114bc6754","productName":"MSI B350 TOMAHAWK AM4 AMD B350 SATA 6Gb/s USB 3.1 HDMI ATX AMD Motherboard","serialNumber":" N82E16813144018","category":"MotherBoard","price":84,"productDescription":"\n            Number of Memory Slots: 4×288pinMemory Standard: DDR4 3200(OC)+/ 2933(OC)/ 2667(OC)/ 2400/ 2133/ 1866\n* 7th Gen A-series / Athlon processors support up to 2400 MHz.PCI Express 3.0 x16: 1 x PCIe 3.0 x16 slot (PCI_E2)\n- Supports x16 speed with ","condition":"old","warranty":"no","packaging":"no","userUploadImage1":"13-144-018-V02.jpg","userUploadImage2":null,"verified":true,"status":"available","createdAt":"2018-01-20T01:32:54.000Z","updatedAt":"2018-01-20T01:32:54.000Z"},{"id":"d67b906c-fd81-11e7-9a91-0a2645a02380","userId":"35322927-4208-456d-a733-f911b03fa546","productName":"MSI B350 GAMING PLUS AM4 AMD B350 SATA 6Gb/s USB 3.1 HDMI ATX AMD Motherboard","serialNumber":" N82E16813144047","category":"MotherBoard","price":85,"productDescription":"\n            Number of Memory Slots: 4×288pinMemory Standard: DDR4 3200(OC)+/ 2933(OC)/ 2667(OC)/ 2400/ 2133/ 1866\n* 7th Gen A-series/ Athlon processors support up to 2400 MHz.PCI Express 3.0 x16: 1 x PCIe 3.0 x16 slot (PCI_E2)\n- Supports x 16 speed with ","condition":"old","warranty":"no","packaging":"yes","userUploadImage1":"13-144-047-V01.jpg","userUploadImage2":null,"verified":true,"status":"sold","createdAt":"2018-01-20T01:32:54.000Z","updatedAt":"2018-01-28T22:53:44.000Z"},{"id":"d68908c5-fd81-11e7-9a91-0a2645a02380","userId":"5dfb8717-0aad-425e-8609-2bb47bdb40b5","productName":"MSI B350 PC MATE AM4 AMD B350 SATA 6Gb/s USB 3.1 HDMI ATX AMD Motherboard","serialNumber":" N82E16813144029","category":"MotherBoard","price":66,"productDescription":"\n            Number of Memory Slots: 4×288pinMemory Standard: DDR4 3200(OC)+/ 2933(OC)/ 2667(OC)/ 2400/ 2133/ 1866*\n* 7th Gen A-series/ Athlon processors support a maximum of DDR4 2400 MHz.PCI Express 3.0 x16: 1 x PCIe 3.0 x16 slot (PCI_E2)\n- Supports x16","condition":"old","warranty":"no","packaging":"yes","userUploadImage1":"13-144-029-Z01.jpg","userUploadImage2":null,"verified":true,"status":"sold","createdAt":"2018-01-20T01:35:14.000Z","updatedAt":"2018-01-20T01:35:14.000Z"},{"id":"d6971572-fd81-11e7-9a91-0a2645a02380","userId":"b27abfc6-60c1-4569-ab17-650114bc6754","productName":"MSI B350 GAMING PRO CARBON AM4 AMD B350 SATA 6Gb/s USB 3.1 HDMI ATX AMD Motherboard","serialNumber":" N82E16813144031","category":"MotherBoard","price":109,"productDescription":"\n            Number of Memory Slots: 4×288pinMemory Standard: DDR4 3200(OC)+/ 2933(OC)/ 2667(OC)/ 2400/ 2133/ 1866\n* 7th Gen A-series/ Athlon processors support up to 2400 MHz only.PCI Express 3.0 x16: 1 x PCIe 3.0 x16 slot (PCI_E2)\n- RYZEN series process","condition":"old","warranty":"no","packaging":"no","userUploadImage1":"13-144-031-V22.jpg","userUploadImage2":null,"verified":true,"status":"available","createdAt":"2018-01-20T01:32:55.000Z","updatedAt":"2018-01-20T01:32:55.000Z"},{"id":"d6a4c6a3-fd81-11e7-9a91-0a2645a02380","userId":"a5c2cd7b-93bf-483b-b943-02bf7cd3428c","productName":"MSI B350 TOMAHAWK ARCTIC AM4 AMD B350 SATA 6Gb/s USB 3.1 HDMI ATX Motherboards - AMD ","serialNumber":" N82E16813144028","category":"MotherBoard","price":94,"productDescription":"\n            Number of Memory Slots: 4×288pinMemory Standard: DDR4 3200(OC)+ / 2933(OC) / 2667(OC) / 2400 / 2133 / 1866\n* 7th Gen A-series/ Athlon processors support up to 2400 MHz.PCI Express 3.0 x16: 1 x PCIe 3.0 x16 slot (PCI_E2)\n- Supports x16 speed w","condition":"new","warranty":"yes","packaging":"no","userUploadImage1":"13-144-028-Z01.jpg","userUploadImage2":null,"verified":true,"status":"sold","createdAt":"2018-01-20T01:32:55.000Z","updatedAt":"2018-01-20T01:32:55.000Z"},{"id":"d6c141c1-fd81-11e7-9a91-0a2645a02380","userId":"35322927-4208-456d-a733-f911b03fa546","productName":"MSI B350 KRAIT GAMING AM4 AMD B350 SATA 6Gb/s USB 3.1 HDMI ATX AMD Motherboard","serialNumber":" N82E16813144025","category":"MotherBoard","price":93,"productDescription":"\n            Number of Memory Slots: 4×288pinMemory Standard: DDR4 3200(OC)+/ 2933(OC)/ 2667(OC)/ 2400/ 2133/ 1866 *\n* 7th Gen A-series/ Athlon processors support a maximum of 2400 MHz.PCI Express 3.0 x16: 1 x PCIe 3.0 x16 slots (PCIE_2)\n- RYZEN series pr","condition":"new","warranty":"no","packaging":"no","userUploadImage1":"13-144-025-V01.jpg","userUploadImage2":null,"verified":true,"status":"sold","createdAt":"2018-01-20T01:32:55.000Z","updatedAt":"2018-01-20T01:32:55.000Z"},{"id":"d6d038d5-fd81-11e7-9a91-0a2645a02380","userId":"b27abfc6-60c1-4569-ab17-650114bc6754","productName":"LIAN LI ALPHA 330W White SECC ATX Mid Tower Computer Case","serialNumber":" N82E16811112578","category":"MotherBoard","price":85,"productDescription":"\n            Motherboard Compatibility: ATXFront Ports: 2 x USB 3.0 / 1 x USB 3.1 (Type-C) / HD Audio120mm Fans: Rear: 1 x 120mm fan (included)\n\nTop: 3 x 140/120mm fan\n\nFront: 3 x 140/120mm fanPower Supply Mounted: Bottom\n            \n                Mode","condition":"old","warranty":"yes","packaging":"yes","userUploadImage1":"11-112-578-V19.jpg","userUploadImage2":null,"verified":true,"status":"available","createdAt":"2018-01-20T01:32:55.000Z","updatedAt":"2018-01-20T01:32:55.000Z"},{"id":"d6df82ba-fd81-11e7-9a91-0a2645a02380","userId":"5dfb8717-0aad-425e-8609-2bb47bdb40b5","productName":"LIAN LI ALPHA 330X Black SECC ATX Mid Tower Computer Case","serialNumber":" N82E16811112577","category":"MotherBoard","price":84,"productDescription":"\n            Motherboard Compatibility: ATXFront Ports: 2 x USB 3.0 / 1 x USB 3.1 (Type-C) / HD Audio120mm Fans: Top: 3 x 140/120mm fan (Optional)\n\nFront: 3 x 140/120mm fan (Optional)\n\nRear: 1 x 120mm fan (included)Power Supply Mounted: Bottom\n           ","condition":"old","warranty":"no","packaging":"no","userUploadImage1":"11-112-577-V11.jpg","userUploadImage2":null,"verified":true,"status":"sold","createdAt":"2018-01-20T01:35:14.000Z","updatedAt":"2018-01-20T01:35:14.000Z"},{"id":"d7126c70-fd81-11e7-9a91-0a2645a02380","userId":"a5c2cd7b-93bf-483b-b943-02bf7cd3428c","productName":"Phanteks Enthoo Pro M Series PH-ES515PTG_BK Brushed Black Steel frame / ABS Front / Tempered Glass Window ATX Mid Tower Computer Case","serialNumber":" N82E16811854042","category":"MotherBoard","price":84,"productDescription":"\n            Motherboard Compatibility: Micro ATX / ATX / Mini ITX / E-ATXFront Ports: 2 x USB 3.0 / 1 x Mic / 1 x Headphone120mm Fans: Top: 3 x 120mm / 2 x 140mm fanPower Supply Mounted: Bottom\n            \n                Model #: PH-ES515PTG_BK\n       ","condition":"old","warranty":"yes","packaging":"no","userUploadImage1":"11-854-042-V01.jpg",
        // "userUploadImage2":null,"verified":true,"status":"sold","createdAt":"2018-01-20T01:35:14.000Z","updatedAt":"2018-01-20T01:35:14.000Z"},
        // {"id":"d72187d4-fd81-11e7-9a91-0a2645a02380","userId":"a5c2cd7b-93bf-483b-b943-02bf7cd3428c","productName":"Phanteks Enthoo Pro M Series PH-ES515P_BK Black Steel / Plastic ATX Mid Tower Computer Case","serialNumber":" N82E16811854019","category":"MotherBoard","price":58,"productDescription":"\n            Motherboard Compatibility: Micro ATX / ATX / Mini ITX / E-ATX (up to 264mm wide)Front Ports: 2 x USB 3.0 / Mic / Headphone / Reset120mm Fans: Front: 2 x 120mm (3 x 120mm without ODD cage) or 2 x 140mm\nTop: 3 x 120mm or 2 x 140mmPower Supply M","condition":"old","warranty":"no","packaging":"no","userUploadImage1":"11-854-019-01.jpg","userUploadImage2":null,"verified":true,"status":"available","createdAt":"2018-01-20T01:32:55.000Z","updatedAt":"2018-01-20T01:32:55.000Z"},{"id":"d73137b0-fd81-11e7-9a91-0a2645a02380","userId":"35322927-4208-456d-a733-f911b03fa546","productName":"Phanteks ENTHOO Pro M PH-ES515PA_AG Anthracite Gray Steel / Plastic/Full Size Acrylic Window ATX Mid Tower Cases","serialNumber":" N82E16811854037","category":"MotherBoard","price":66,"productDescription":"\n            Motherboard Compatibility: Micro ATX / ATX / Mini ITX / E-ATXFront Ports: 2 x USB 3.0 / Mic / Headphone / Reset120mm Fans: Front: 2x (3x without ODD cage)\nTop: 3x\nRear: 1xSide Panel Window: Yes\n            \n                Model #: PH-ES515PA","condition":"old","warranty":"no","packaging":"no","userUploadImage1":"11-854-037-12.jpg","userUploadImage2":null,"verified":true,"status":"available","createdAt":"2018-01-20T01:32:56.000Z","updatedAt":"2018-01-20T01:32:56.000Z"}],"pages":0,"limit":15,"productId":"d623f7c9-fd81-11e7-9a91-0a2645a02380","userId":"35322927-4208-456d-a733-f911b03fa546","productName":"GIGABYTE Z370 AORUS GAMING WIFI (rev. 1.0) LGA 1151 (300 Series) Intel Z370 HDMI SATA 6Gb/s USB 3.1 ATX Intel Motherboard","serialNumber":" N82E16813145043","category":"MotherBoard","price":126,"productDescription":"\n            Memory Standard: DDR4 4000(O.C.)/ 3866(O.C.)/ 3800(O.C.)/ 3733(O.C.)/ 3666(O.C.)/ 3600(O.C.)/ 3466(O.C.)/ 3400(O.C.)/ 3333(O.C.)/ 3300(O.C.)/ 3200(O.C.)/ 3000(O.C.)/ 2800(O.C.)/ 2666/ 2400/ 2133Number of Memory Slots: 4×288pinAudio Chipset: C","condition":"new","warranty":"no","packaging":"no",
        // "photos":[{"img1":"13-145-043-V06.jpg"},{"img2":null}],"verified":false,"status":"available","createdAt":"01-20-2018"}]

    }
    handleLoggedChange = (event, logged) => {
        this.setState({ logged: logged });
    };


    logOutHandler = () => {
        this.setState({ logged: false });
        sessionStorage.removeItem('auth')
    }

    userInputHandlerlogged = (event) => {
        this.setState({ userInput: event.target.value })
    }

    handleClick = (i, j) => {
        // let cartitem = this.state.cartItem + 1;
        // let cartamount = this.state.cartAmount + i;
        // let newcartarray = this.state.cartarray.concat(j);
        // this.setState({ cartItem: cartitem, cartAmount: cartamount, cartarray: newcartarray });
       

        // localStorage.setItem('CartItem', cartitem);
        // localStorage.setItem('CartAmount', cartamount);
        // localStorage.setItem('cartarray', JSON.stringify(newcartarray));

    };

    handleDelete = (amount, k) => {
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
   
    };

    render() {
    

        /* below Routed.... components are created to pass down props to routed component */
        const RoutedMainPage = (props) => {
            return (
                <MainPage component={MainPage}
                    cartitem={this.state.cartItem}
                    cartamount={this.state.cartAmount}
                    cartarray={this.state.cartarray}
                    onClick={this.handleClick} {...props }
                />
            );
        }
            //console.log(this.state.theId);
            let tmpid=this.state.theId;

        const RoutedProfilePage = (props) => {
            //console.log(this.state.theId);

            return (
                
                <UserProfile theuserid={this.state.theId} component={UserProfile} {...props}

                />
            )
        }
        const RoutedProductDetailPage = (props) => {
            return (
                <ProductDetailPage
                    component={ProductDetailPage}
                    cartitem={this.state.cartItem}
                    cartamount={this.state.cartAmount}
                    cartarray={this.state.cartarray}
                    onClick={this.handleClick} {...props }
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
                    component={CheckOutPage}
                    cartitem={this.state.cartItem}
                    cartamount={this.state.cartAmount}
                    cartarray={this.state.cartarray}
                    onClick={this.handleClick}
                    
                    handleDelete={this.handleDelete} {...props }
                />
            )
        }

        return (
            <Container fluid={false} >
           
            <BrowserRouter>
                <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)} >
                    <div className="App" >
                    
{/* // {console.log(this.state.userDataObj)} */}
                        <Navbar 
                        //  ref={(this.state.userDataObj) => { this.state.userDataObj = ; }}
                        
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
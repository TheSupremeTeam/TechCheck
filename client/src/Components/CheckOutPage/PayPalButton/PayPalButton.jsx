import React, {Component} from 'react';
import PaypalExpressBtn from 'react-paypal-express-checkout';
import axios from 'axios'

export default class PayPalButton extends Component {
    state={
        orderNum:''
    }
    render() {
        const onSuccess = (payment) => {
            // Congratulation, it came here means everything's fine!
console.log(this.props)
            function S4() {
                return (((1+Math.random())*0x10000)|0).toString(16).substring(1); 
            }
             
            // then to call it, plus stitch in '4' in the third group
          const  guid = (S4() + S4() + "-" + S4() + "-4" + S4().substr(0,3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
 this.setState({
     orderNum:guid
 })
          function Prod(order, sell, buy, id,price,fPrice) {
            this.orderNum = order;
            this.sellerId = sell;
            this.buyerId = buy;
            this.proudctId = id;
            this.itemPrice=price;
            this.finalPrice=fPrice;
        }
        let total1 = ((9 / 100) * this.props.cartamount) + this.props.cartamount
                const tmp = JSON.parse(localStorage.getItem('cartarray'));
localStorage.setItem('total',total1)
sessionStorage.setItem('iduser',this.props.thisUser.userId)


         console.log( )
              const  receipt=[];
                for(let i=0;i<tmp.length;i++){
let prod=new Prod(guid,tmp[i].userId,this.props.thisUser.userId,tmp[i].productId,tmp[i].price,total1)
receipt.push(prod)

                }
                console.log(receipt)
                // sessionStorage.setItem('items',sessionStorage.setItem(receipt))
axios({
    method:'post',
    url:'/api/purchases/create',
    data:{array:
        receipt,userId:this.props.userId}
    
}).then(fun=>{
    console.log(fun)
    window.location=`/receipt/${this.state.orderNum}`
})
            
 
            		console.log("The payment was succeeded!", tmp);
            		// You can bind the "payment" object's value to your state or props or whatever here, please see below for sample returned data
        }		
        
        const onCancel = (data) => {
            // User pressed "cancel" or close Paypal's popup!
            console.log('The payment was cancelled!', data);
            // You can bind the "data" object's value to your state or props or whatever here, please see below for sample returned data
        }	
        
        const onError = (err) => {
            // The main Paypal's script cannot be loaded or somethings block the loading of that script!
            console.log("Error!", err);
            // Because the Paypal's main script is loaded asynchronously from "https://www.paypalobjects.com/api/checkout.js"
            // => sometimes it may take about 0.5 second for everything to get set, or for the button to appear			
        }			
            
        let env = 'sandbox'; // you can set here to 'production' for production
        let currency = 'USD'; // or you can set this value from your props or state  
        let total = (((9 / 100) * this.props.cartamount) + this.props.cartamount).toFixed(2); // same as above, this is the total amount (based on currency) to be paid by using Paypal express checkout
        // Document on Paypal's currency code: https://developer.paypal.com/docs/classic/api/currency_codes/
        
        const client = {
            sandbox:    'AbBObKXWXd868x3p37xXih8dVqhhWMuQenDb18nuvMjar1mIyP4PzY18gqV40h8GpFZf-GnHeEAPA3qF',
            production: 'YOUR-PRODUCTION-APP-ID',
        }

        return (
          
            
            <PaypalExpressBtn 
             env={env} client={client} currency={currency} onSuccess={onSuccess} total={total} />
            
        );
    }
}    
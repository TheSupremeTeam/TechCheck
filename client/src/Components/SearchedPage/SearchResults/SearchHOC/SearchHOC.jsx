import React, { Component } from 'react';

import { Row, Col, Container } from 'react-grid-system';
import loadingGif from './loading.gif'


const WithPermissions =(loading, notfound, BaseComponent)=>{
    return class WithPermissions extends Component {
        state={
            hasPermissions:false,
            loading:false
        }
    
            componentDidMount = async ( ) => {
                if(loading=== true){
                    this.setState({
                        loading:true
                    })
                }
           
                  
              };
            hasPermissions= async ()=>{
             
             };

        render(){
            let Component;
            if(this.state.loading ===false){
                Component=<BaseComponent/>
            }else if(this.state.loading === true){
                Component=<div> <img src={loadingGif} alt=''/></div>
            }
            
          
            return(
                <div>
        
  {Component}
            </div>
        )
        }
    }
}
export default WithPermissions;
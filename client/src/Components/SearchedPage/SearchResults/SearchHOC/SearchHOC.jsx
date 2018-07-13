import React, { Component } from 'react';
import { GridList, GridTile } from 'material-ui/GridList';
import { Row, Col, Container } from 'react-grid-system';
import Loading from './loadingSearch'
import loadingGif from './loading.gif'
import './searchHoc.css'
import NoProducts from './Noproducts'
import axios from "axios";
const styles = {
    root: {
      padding: '20px auto',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      width: '100%',
      border: '1px solid gray'
    },
    gridList: {
      width: '90%',
      height: '100%',
      overflowY: 'auto',
    },
  
  };

const WithPermissions =(loading, notfound, BaseComponent,search)=>{
    return class WithPermissions extends Component {
        state={
            notfound:false,
            loading:false,
            products:[]
        }
    search=async()=>{
        let data=  await axios({
            method: 'post',
            url: `/api/products/search`,
            data: {
              search: search,
              page: 0,
              limit: 15
      
            }
          })
          this.setState({
              products:data.data
          })
    }
            componentDidMount = async ( ) => {
                if(loading=== true){
                    this.setState({
                        loading:true,
                        notfound:false
                    })
                }
                else if (notfound=== true){
                    this.setState({
                        notfound:true,
                        loading:false
                    })
                }else if(loading===false&&notfound===false){
                    this.setState({
                        notfound:false,
                        loading:false
                    })
                    
           
                  
              };
            }
            hasPermissions= async ()=>{
             
             };

        render(){
            let Component;
            if(this.state.loading ===false&&this.state.notfound===false){
                Component=<BaseComponent products={this.state.products} />
            }else if(this.state.loading === true){
                Component=<Loading/>
            }else if(this.state.notfound===true){
                Component=<NoProducts/>
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
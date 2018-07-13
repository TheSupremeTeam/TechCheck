import React, { Component } from 'react';
import { GridList, GridTile } from 'material-ui/GridList';
import { Row, Col, Container } from 'react-grid-system';
import loadingGif from './loading.gif'
import './searchHoc.css'
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
class NotFound extends Component {
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

            <GridTile    
            class='theLoadingArea'
              style={{ border: '1px ' }}>
                 <img src={loadingGif} class="loading"alt='loading'/>
                 </GridTile>
         <br />
          <div className='pages'>
            <button onClick={this.pages} name='1' value={0} >1</button><button onClick={this.pages} name='2' value={15} >2</button> <button onClick={this.pages} name='3' value={30} >3</button> <button onClick={this.pages} value={45} >4</button> <button onClick={this.pages} value={60} >5</button>
          </div>

        </GridList>
      
         
      </div>
    )
  }
}

export default NotFound
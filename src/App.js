import { Container } from '@mui/material';
import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import {itGetProduct, filter} from './redux/actions'
import "./App.scss"
import { Box } from '@mui/system'
import Card from "./components/Card"

function App({itGetProduct, category = ["Amazon Launchpad"], filter, filterText, product}) {
  useEffect(() => {
    fetch('http://localhost:3001/product')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
         if(filterText){
           const filterData = data.filter(item => {
             return item.name.toLowerCase().includes(filterText.toLowerCase())
           })
           itGetProduct(filterData)
         } else {
           itGetProduct(data)
         }
      });
  }, [itGetProduct, filterText]);


  return (
      <div className="App">
          <header className="header">
            <Container>
              <input className="header-input" placeholder="Search" onInput={(e) => filter(e.target.value)}/>
            </Container>
          </header>
          <Container>
            <Box sx={{display: "flex", flexWrap: "wrap", columnGap: "58px", rowGap: "20px"}}>
                {
                    product.map(({asin, ...allData}) => {
                        return <Card key={asin} {...allData}/>
                    })
                }
            </Box>
        </Container>
      </div>
  );
}

const mapStateToProps = (state) => {
  return {
    product: state.product,
    filterText: state.filterText
  }
}

const mapDispatchToProps = {
  itGetProduct,
  filter
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
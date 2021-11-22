import { Container } from '@mui/material';
import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import {setProduct, setFilter} from './redux/actions'
import "./App.scss"
import { Box } from '@mui/system'
import Card from "./components/Card"
import { Formik } from 'formik'
import * as Yup from 'yup'

function App({setProduct, setFilter, filterText, product}) {
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
           setProduct(filterData)
         } else {
           setProduct(data)
         }
      });
  }, [setProduct, filterText]);

  const filterShema = Yup.object().shape({
    search: Yup.string().min(3, "Minimal length 3")
  })

  return (
      <div className="App">
          <header className="header">
            <Container>
            <Formik
              initialValues={{ search: "" }}
              validationSchema={filterShema}
              onSubmit={(values, { setSubmitting }) => {
                  setFilter(values.search)
                  setSubmitting(false)
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                /* and other goodies */
              }) => (
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="search"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    className="header-input"
                  />
                  <span className="header-input-error">{errors.search && touched.search && errors.search}</span>
                </form>
              )}
            </Formik>
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
  setProduct,
  setFilter
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
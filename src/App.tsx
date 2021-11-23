import { Container, FormControl } from '@mui/material';
import React, {useEffect, useState} from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import {setProduct} from './redux/actions'
import "./App.scss"
import { Box } from '@mui/system'
import Card from "./components/Card"
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useQueryParams, StringParam } from 'use-query-params'

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';

interface IProps {

}

const App:React.FC<IProps> = () => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useQueryParams({
    name: StringParam,
    category: StringParam
  })
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);

  useEffect(() => {
    fetch('http://localhost:3001/product')
      .then((response) => {
        return response.json()
      }).then(data => 
        dispatch(setProduct(data))
      )
  }, []);

  useEffect(() => {
    if(product?.length) {
      setData(product)
    }
  }, [product])

  const filterShema = Yup.object().shape({
    search: Yup.string().min(3, "The minimum number of characters is 3")
  })

  return (
      <div className="App">
          <header className="header">
            <Container>
            <Formik
              initialValues={{ search: query.name, tag: "" }}
              validationSchema={filterShema}
              onSubmit={(values, { setSubmitting }) => {
                  const filterData = product.filter((item: any) => {
                    return (values?.search?.length ? item.name.toLowerCase().includes(values.search.toLowerCase()) : true) && (values.tag !== '' ? item.bsr_category === values.tag : true)
                  })
                  setData(filterData)
                  setQuery({"name": values.search})
                  setSubmitting(false);
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
                setFieldValue
              }) => (
                <form className="header-form" onSubmit={handleSubmit}>
                  <div className="header-input-wrapper">
                    <input
                      autoComplete="off"
                      type="text"
                      name="search"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.search}
                      className="header-input"
                    />
                    <div className="header-input-error">{errors.search && touched.search && errors.search}</div>
                  </div>
                  <FormControl sx={{ m: 1, width: 200, height: "100%" }}>
                    <InputLabel id="demo-multiple-name-label">Product tag</InputLabel>
                    <Select
                      labelId="demo-multiple-name-label"
                      id="demo-multiple-name"
                      placeholder="Tag"
                      value={query.category}
                      input={<OutlinedInput label="Name" />}
                      onChange={(e) => {
                        setFieldValue('tag', e.target.value)
                        setQuery({"category": e.target.value})
                      }}
                    >
                      <MenuItem value="">All</MenuItem>
                      {
                        [...new Set(product?.map(item => item?.bsr_category))].map((allData) => {
                            return <MenuItem value={allData} key={allData}>{allData}</MenuItem>
                        })
                      }
                    </Select>
                  </FormControl>
                  <button type="submit" className="header-form-button" disabled={isSubmitting}>
                    Submit
                  </button>
                </form>
              )}
            </Formik>
            </Container>
          </header>
          <Container>
            <Box sx={{display: "flex", flexWrap: "wrap", columnGap: "58px", rowGap: "20px"}}>
                {
                  data.map(({asin, ...allData}) => {
                      return <Card key={asin} {...allData}/>
                  }) 
                }
            </Box>
        </Container>
      </div>
  );
}

const mapDispatchToProps = {
  setProduct
}

export default App;
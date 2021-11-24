import React, {useState, useEffect} from 'react';
import { getData } from './redux/actionCreators/getProducts';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from './hooks/useTypeSelector';
import { Formik } from 'formik';
import { useQueryParams, StringParam } from 'use-query-params';
import * as Yup from 'yup'

import "./App.scss"

import Card from "./components/Card"
import { IProduct } from './redux/reducers';

import { Container, FormControl, Box } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const [ filterData, setFilterData ] = useState<IProduct[]>([]);
  const { products, loading } = useTypedSelector((state) => state.products);
  const [ search, setSearch ] = useQueryParams({
    name: StringParam,
    category: StringParam
  });
  const filterCategory = Array.from(new Set(products?.map(item => item?.bsr_category)))


  useEffect(() => {
    if(products?.length) {
      setFilterData(products)
    }
  }, [products])

  useEffect(() => {
    dispatch(getData());
  }, [dispatch])

  const filterShema = Yup.object().shape({
    search: Yup.string().min(3, "The minimum number of characters is 3")
  })

  return (
      <div>
        <Container>
          <header>
              <Formik
                initialValues={{ search: search.name || "", tag: search.category }}
                validationSchema={filterShema}
                onSubmit={(values, { setSubmitting }) => {
                  const filterDataByText = products.filter((item) => {
                    return (values.search.length ? item.name.toLowerCase().includes(values.search.toLowerCase()) : true) && (values.tag !== '' ? item.bsr_category === values.tag : true)
                  })
                  setFilterData(filterDataByText)
                  setSearch({"name": values.search})
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
                      <InputLabel id="demo-multiple-name-label">Category</InputLabel>
                      <Select
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        placeholder="Tag"
                        value={values.tag}
                        input={<OutlinedInput label="Name" />}
                        onChange={(e) => {
                          setFieldValue('tag', e.target.value)
                          setSearch({"category": e.target.value})
                        }}
                      >
                        <MenuItem value="">All</MenuItem>
                        {
                          filterCategory.map((tag) => {
                              return <MenuItem value={tag} key={tag}>{tag}</MenuItem>
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
          </header>
        </Container>
        <Container>
            <Box sx={{display: "flex", flexWrap: "wrap", columnGap: "58px", rowGap: "20px"}}>
                {
                  loading ? <div>Loading...</div> : filterData.map(({asin, ...allData}) => {
                    return <Card key={asin} {...allData}/>
                  }) 
                }
            </Box>
        </Container>
      </div>
  );
}

export default App;

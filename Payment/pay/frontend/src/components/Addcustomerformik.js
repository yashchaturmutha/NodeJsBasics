import React from 'react';
import { useFormik } from 'formik';
import { validationSchemafirst } from './validationSchema';
import {
  Box,
  Button,
  Grid,
  Hidden,
  TextField,
  Typography,
} from '@mui/material';
import { loadStripe } from '@stripe/stripe-js';
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

const stripePromise = loadStripe('pk_test_51N3e2JSIOp89KyYyPL1L1NAznrvMR2PrAMMpi5akZ7sH9fDVrrJRjOVYBJT0so0RjAcg8R5xSjKr14XbSI7rexIn00ThqrNOeV');



const initialValues = {
  name: '',
  email: '',
  line1: '',
  city: '',
  state1: '',
  pcode: '',
  country: '',
};

// const onSubmit = (values) => {
//   console.log('form data', values);
//   // event.preventDefault();

//   const stripe =  stripePromise;


//   axios.post('http://localhost:3000/create-customer', {
     
//        ...values      
//     }).then((res)=>{
//       console.log("res",res);
//       navigate("/addCard")
//     })
// };

// const validate=values=>{

//   let errors={}

//   if(!values.name){
//     errors.name='required'
//   }
//   if(!values.email){
//     errors.email='required'
//   } if(!values.line1){
//     errors.line1='required'
//   } if(!values.city){
//     errors.city='required'
//   } if(!values.state1){
//     errors.state1='required'
//   }if(!values.pcode){
//     errors.pcode='required'
//   }if(!values.country){
//     errors.country='required'
//   }
//   return errors
// }

const Addcustomerformik = () => {
  const navigate=useNavigate()
  const onSubmit = (values) => {
    console.log('form data', values);
    // event.preventDefault();
  
    const stripe =  stripePromise;
  
  
    axios.post('http://localhost:3000/create-customer', {
       
         ...values      
      }).then((res)=>{
        console.log("res",res);
        navigate("/addCard")
      })
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    // validate
    validationSchema: validationSchemafirst,
  });

  // console.log('form errors', formik.errors);
  return (
    <>
      <Grid
        container
        height={'100%'}
        width={'100%'}
        sx={{ backgroundColor: '#fff', overflow: 'none' }}
      >
        <Hidden mdDown>
          <Grid item md={7} sx={{ backgroundColor: '#fff' }}>
            <Box height={'100vh'}>
              <Box height={'4vh'}></Box>
              <Box height={'92vh'}>
                <img src={''} alt="" width={'100%'} height={'100%'} />
              </Box>
            </Box>
          </Grid>
        </Hidden>

        <Grid
          item
          xs={12}
          sm={12}
          md={5}
          sx={{ backgroundColor: '#fff' }}
          height={'100vh'}
        >
          <Grid container>
            <Grid item xs={1} sm={1} md={2.2}></Grid>
            <Grid item xs={10} sm={10} md={7}>
              {/* <Box height={'15vh'}></Box> */}
              <Box height={'13vh'} sx={{ mt: '7vh' }}>
                {/* <img src={''} alt="" width={'45px'} height={'45px'} /> */}
                <Typography
                  sx={{
                    color: '#343A40',
                    fontWeight: 700,
                    fontSize: {
                      xs: '24px',
                      sm: '24px',
                      md: '24px',
                      lg: '28px',
                      xlg: '',
                    },
                    mt: 2,
                  }}
                >
                  Welcome To Onco
                </Typography>

                <TextField
                  name="name"
                  label="Name"
                  variant="outlined"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  fullWidth
                  size="small"
                  sx={{ mt: 2 }}
                />
                {formik.touched.name && formik.errors.name ? (
                  <div>{formik.errors.name}</div>
                ) : null}

                <TextField
                  name="email"
                  label="Email"
                  variant="outlined"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  fullWidth
                  size="small"
                  sx={{ mt: 2 }}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div>{formik.errors.email}</div>
                ) : null}

                <Typography sx={{ mt: 2 }}>Address</Typography>
                <TextField
                  name="line1"
                  label="Street Line"
                  variant="outlined"
                  value={formik.values.line1}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  fullWidth
                  size="small"
                  sx={{ mt: 2 }}
                />
                {formik.touched.line1 && formik.errors.line1 ? (
                  <div>{formik.errors.line1}</div>
                ) : null}

                <TextField
                  name="city"
                  label="City"
                  variant="outlined"
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  fullWidth
                  size="small"
                  sx={{ mt: 2 }}
                />
                {formik.touched.city && formik.errors.city ? (
                  <div>{formik.errors.city}</div>
                ) : null}

                <TextField
                  name="state1"
                  label="State"
                  variant="outlined"
                  value={formik.values.state1}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  fullWidth
                  size="small"
                  sx={{ mt: 2 }}
                />
                {formik.touched.state1 && formik.errors.state1 ? (
                  <div>{formik.errors.state1}</div>
                ) : null}

                <TextField
                  name="pcode"
                  label="PIN Code"
                  variant="outlined"
                  value={formik.values.pcode}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  fullWidth
                  size="small"
                  sx={{ mt: 2 }}
                />
                {formik.touched.pcode && formik.errors.pcode ? (
                  <div>{formik.errors.pcode}</div>
                ) : null}

                <TextField
                  name="country"
                  label="Country"
                  variant="outlined"
                  value={formik.values.country}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  fullWidth
                  size="small"
                  sx={{ mt: 2 }}
                />
                {formik.touched.country && formik.errors.country ? (
                  <div>{formik.errors.country}</div>
                ) : null}

                 
                <Button fullWidth sx={{ mt: 2 }} onClick={formik.handleSubmit}>Submit</Button>
              </Box>
            </Grid>
            <Grid item xs={1} sm={1} md={2.2}></Grid>
          </Grid>
        </Grid>
      </Grid>
      {/* <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2} md={12}>
      <Grid item md={4} xs={1} sm={1} lg={4}></Grid>
      <Grid item md={4} xs={10} sm={10} lg={4}>     
        <Grid item  >
          <TextField 
            name='name'
            label='name'
            variant='outlined'
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            fullWidth
          />
            {formik.touched.name && formik.errors.name ? (
          <div>{formik.errors.name}</div>
        ) : null}
        </Grid>
        <Grid item >
          <TextField 
            name='email'
            label='email'
            variant='outlined'
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            fullWidth
          />
           {formik.touched.email && formik.errors.email ? (
          <div>{formik.errors.email}</div>
        ) : null}
        </Grid> 
        <Grid item >
          <TextField 
            name='line1'
            label='line1'
            variant='outlined'
            value={formik.values.line1}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            fullWidth
          />
           {formik.touched.line1 && formik.errors.line1 ? (
          <div>{formik.errors.line1}</div>
        ) : null}
        </Grid> 
        <Grid item >
          <TextField 
            name='city'
            label='city'
            variant='outlined'
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            fullWidth
          />
           {formik.touched.city && formik.errors.city ? (
          <div>{formik.errors.city}</div>
        ) : null}
        </Grid> 
        <Grid item >
          <TextField 
            name='state1'
            label='state1'
            variant='outlined'
            value={formik.values.state1}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            fullWidth
          />
          {formik.touched.state1 && formik.errors.state1 ? (
          <div>{formik.errors.state1}</div>
        ) : null}
        </Grid> 
        <Grid item >
          <TextField 
            name='pcode'
            label='pcode'
            variant='outlined'
            value={formik.values.pcode}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            fullWidth
          />
          {formik.touched.pcode && formik.errors.pcode ? (
          <div>{formik.errors.pcode}</div>
        ) : null}
        </Grid> 
        <Grid item >
          <TextField 
            name='country'
            label='country'
            variant='outlined'
            value={formik.values.country}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            fullWidth
          />
            {formik.touched.country && formik.errors.country ? (
          <div>{formik.errors.country}</div>
        ) : null}
        </Grid>
        <Grid item >
          <Button onClick={formik.handleSubmit}>Submit</Button>
        </Grid>
        </Grid>
        <Grid item md={4} xs={1} sm={1} lg={4}></Grid>
      </Grid>
       
      </form> */}
    </>
  );
};

export default Addcustomerformik;

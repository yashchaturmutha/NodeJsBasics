import * as Yup from 'yup'

export const validationSchemafirst= Yup.object({
    name:Yup.string().required('Name is required'),
    email:Yup.string().email('invalid format').required('Email id required !'),
    line1:Yup.string().required('Line is required'),
    city:Yup.string().required('City is required'),
    state1:Yup.string().required('State is required !'),
    pcode:Yup.string().required('PIN Code is required').min(5).max(5),
    country:Yup.string().required('Country is required')
})
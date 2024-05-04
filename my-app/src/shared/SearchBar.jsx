import React, {useRef, useState} from 'react'
import './search-bar.css';
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {Alert,AlertIcon,AlertTitle} from '@chakra-ui/react'
import {Col, Form, FormGroup} from 'reactstrap';
import { BASE_URL } from '../utils/config';

const SearchBar = () => {
    // const [searcParams, setSearchParams] = useSearchParams();
    // const [q, setq] = useState();
    // const [title, setTitle] = useState(searcParams.get('q') || '');
    
    const locationRef = useRef('')
    const distanceRef = useRef(0)
    const maxGroupSizeRef = useRef(0)
    const navigate = useNavigate()
    
    const searchHandler = async(e)=>{
    
        const location = locationRef.current.value
        const distance = distanceRef.current.value
        const maxGroupSize = maxGroupSizeRef.current.value

        if(location === '' && distance === '' && maxGroupSize === ''){

            <Alert status="error">
                <AlertIcon />
                <AlertTitle>Fill the Fields</AlertTitle>
            </Alert>
        }
            const res = await fetch(`${BASE_URL}/tours/search/getTourBySearch?city=${location}&distance=${distance}&maxGroupSize=${maxGroupSize}`)

            if(!res.ok) alert('Something went wrong')
            const result = await res.json()

            navigate(`/tours/search?city=${location}&distance=${distance}&maxGroupSize=${maxGroupSize}`, {state: result.data})
        // else if(title !== "") {
        //     const params = {
        //         q:title
        //       }
        //       setSearchParams(params);          
        // }
    }


  return (
    <Col lg='12'>
        <div className="search__bar">
            <Form className='d-flex align-items-center gap-4'>
                <FormGroup className='d-flex gap-3 form__group form__group-fast'>
                    <span>
                        <i class="ri-map-pin-fill"></i>
                    </span>
                    <div>
                        <h5>Location</h5>
                        <input type="text" name='city' placeholder='Where are you going?' ref={locationRef} />
                    </div>
                </FormGroup>
                <FormGroup className='d-flex gap-3 form__group form__group-fast'>
                    <span>
                        <i class="ri-map-pin-time-fill"></i>
                    </span>
                    <div>
                        <h5>Distance</h5>
                        <input type="number" placeholder='Distance k/m' ref={distanceRef} />
                    </div>
                </FormGroup>
                <FormGroup className='d-flex gap-3 form__group form__group-last'>
                    <span>
                        <i class="ri-group-fill"></i>
                    </span>
                    <div>
                        <h5>Max People</h5>
                        <input type="number" placeholder='0' ref={maxGroupSizeRef} />
                    </div>
                </FormGroup>

                <span className='search__icon' type='submit' onClick={searchHandler}>
                    <i class="ri-search-eye-line"></i>
                </span>
            </Form>
        </div>
    </Col>
  )
}

export default SearchBar
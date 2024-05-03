import React from 'react'
import TourCard from '../../shared/TourCard'
import tourData from '../../assets/data/tours'
import { Col } from 'reactstrap'    
import { BASE_URL } from '../../utils/config'
import useFetch from '../../hooks/useFetch'

const FeaturedTourList = () => {

  const {data: featuredTours} = useFetch(`${BASE_URL}/tours/search/getFeaturedTours`)
  console.log(featuredTours);

  return (
    <>
        {featuredTours?.map(tour => (
            <Col lg='3' className='mb-4' key={tour._id}>
                <TourCard tour={tour} />
            </Col>
        ))}
    </>
  )
}

export default FeaturedTourList
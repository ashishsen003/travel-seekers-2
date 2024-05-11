import React, { useContext, useEffect, useRef, useState } from "react";
import "../styles/tour-details.css";
import { useParams } from "react-router-dom";
import tourData from "../assets/data/tours";
import { Col, Container, Row, Form, ListGroup } from "reactstrap";
import calculateAvgRating from "./../utils/avgRating";
import avatar from "../assets/images/avatar.jpg";
import { Booking } from "../components/Booking/Booking";
import Newsletter from "../shared/Newsletter";
import { BASE_URL } from "../utils/config";
import useFetch from "../hooks/useFetch";
import loadingGif from "../assets/loading.gif";
import { AuthContext } from "../context/AuthContext";

const TourDetails = () => {
  const { id } = useParams();
  const reviewMsgRef = useRef("");
  const [tourRating, setTourRating] = useState(null);
  const { data: tour, loading, error } = useFetch(`${BASE_URL}/tours/${id}`);
  const {user} = useContext(AuthContext)
  const options = { day: "numeric", month: "long", year: "numeric" };

  const {
    photo,
    title,
    desc,
    price,
    reviews,
    city,
    maxGroupSize,
    distance,
    address,
  } = tour;


  const submitHandle = async(e) => {
    e.preventDefault();
    const reviewText = reviewMsgRef.current.value;
    try {
      if(!user || user === undefined || user === null){
        alert('Please sign in')
      }
      const reviewObj = {
        username: user?.username,
        reviewText,
        rating:tourRating
      }
      const res = await fetch(`${BASE_URL}/review/${id}`, {
        method: 'POST',
        headers:{
          'Content-Type':'application/json'
        },
        // credentials: 'include',
        body: JSON.stringify(reviewObj)
      })
      const result = await res.json()
      if(!res.ok) {
        return alert(result.message)
      }
      alert(result.message)
    } catch (error) {
      alert(error.message)
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [tour]);
  
  const { avgRating, totalRating } = calculateAvgRating;
  return (
    <>
      <section>
        <Container>
          {loading && (
            <div className="loading__div">
              <img src={loadingGif}/>
            </div>
          )}
          {error && <h4 className="text-center pt-5">{error}</h4>}
          {!loading && !error && (
            <Row>
              <Col lg="8">
                <div className="tour__content">
                  <img src={photo} alt="" />
                  <div className="tour__info">
                    <h2>{title}</h2>
                    <div className="d-flex align-items-center gap-5">
                      {/* <span className="tour__location d-flex align-items-center gap-1">
                      <i class="ri-map-pin-fill"></i>
                      {city}
                    </span> */}
                      <span className="tour__rating d-flex align-items-center gap-1">
                        <i
                          className="ri-star-s-fill"
                          style={{ color: "var(--secondary-color)" }}
                        ></i>
                        {avgRating === 0 ? null : avgRating}
                        {totalRating === 0 ? (
                          "Not Rated"
                        ) : (
                          <span>({reviews?.length})</span>
                        )}
                      </span>

                      <span>
                        <i className="ri-map-pin-user-fill"></i>
                        {address}
                      </span>
                    </div>
                    <div className="tour__extra__details">
                      <span>
                        <i className="ri-map-pin-2-line"></i>
                        {city}
                      </span>
                      <span>
                        <i className="ri-money-dollar-circle-line"></i>${price}/per
                        person
                      </span>
                      <span>
                        <i className="ri-map-pin-time-line"></i>
                        {distance}/km
                      </span>
                      <span>
                        <i className="ri-group-line"></i>
                        {maxGroupSize} people
                      </span>
                    </div>
                    <h5>Description</h5>
                    <p>{desc}</p>
                  </div>
                  <div className="tour__reviews mt-4">
                    <h4>Reviews ({reviews?.length} reviews)</h4>

                    <Form onSubmit={submitHandle}>
                      <div className="d-flex align-items-center gap-3 mb-4 rating__group">
                        <span onClick={() => setTourRating(1)}>
                          1<i className="ri-star-s-fill"></i>
                        </span>
                        <span onClick={() => setTourRating(2)}>
                          2<i className="ri-star-s-fill"></i>
                        </span>
                        <span onClick={() => setTourRating(3)}>
                          3<i className="ri-star-s-fill"></i>
                        </span>
                        <span onClick={() => setTourRating(4)}>
                          4<i className="ri-star-s-fill"></i>
                        </span>
                        <span onClick={() => setTourRating(5)}>
                          5<i className="ri-star-s-fill"></i>
                        </span>
                      </div>
                      <div className="review__input border">
                        <input
                          type="text"
                          ref={reviewMsgRef}
                          placeholder="share your thoughts"
                          required
                        />
                        <button
                          className="btn primary__btn text-white"
                          type="submit"
                        >
                          Submit
                        </button>
                      </div>
                    </Form>

                    <ListGroup className="user__review">
                      {reviews?.map((review) => (
                        <div className="review__item">
                          <img src={avatar} alt="" />
                          <div className="w-100">
                            <div className="d-flex align-items-center justify-content-between">
                              <div>
                                <h5>{review.username}</h5>
                                <p>
                                  {new Date(review.createdAt).toLocaleDateString(
                                    "en-US",
                                    options
                                  )}
                                </p>
                              </div>
                              <span className="d-flex align-items-center">
                                {review.rating}<i className="ri-star-s-fill"></i>
                              </span>
                            </div>
                            <h6>{review.reviewText}</h6>
                          </div>
                        </div>
                      ))}
                    </ListGroup>
                  </div>
                </div>
              </Col>
              <Col lg="4">
                <Booking
                  tour={tour}
                  avgRating={avgRating}
                  totalRating={totalRating}
                />
              </Col>
            </Row>
          )}
        </Container>
      </section>
      <Newsletter />
    </>
  );
};

export default TourDetails;

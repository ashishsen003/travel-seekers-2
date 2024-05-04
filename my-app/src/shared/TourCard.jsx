import tourImg1 from "../assets/images/tour-img1.jpg";
import tourImg2 from "../assets/images/tour-img2.jpg";
import tourImg3 from "../assets/images/tour-img3.jpg";
import tourImg4 from "../assets/images/tour-img4.jpg";
import tourImg5 from "../assets/images/tour-img5.jpg";
import tourImg6 from "../assets/images/tour-img6.jpg";
import tourImg7 from "../assets/images/tour-img7.jpg"; 

import React from "react";
import { Link } from "react-router-dom";
import { CardBody, Card } from "reactstrap";
import "./tour-card.css";
import calculateRating from "../utils/avgRating";

const TourCard = ({ tour }) => {
  const { _id, title, city, photo, price, featured, reviews } = tour;
  const { totalRating, avgRating } = calculateRating(reviews);


  return (
    <div className="tour__card">
      <Card>
        <div className="tour__img">
          <img src={photo} alt="tour-img" />
          {featured && <span>Featured</span>}
        </div>
        <CardBody>
          <div className="card__top d-flex align-items-center justify-content-between">
            <span className="tour__location d-flex align-items-center gap-1">
              <i class="ri-map-pin-fill"></i>
              {city}
            </span>
            <span className="tour__rating d-flex align-items-center gap-1">
              <i class="ri-star-fill"></i>
              {avgRating === 0 ? null : avgRating}{" "}
              {totalRating === 0 ? (
                "Not Rated"
              ) : (
                <span>({reviews.length})</span>
              )}
            </span>
          </div>

          <h5 className="tour__title">
            <Link to={`/tours/${_id}`}>{title}</Link>
          </h5>
          <div className="card__button d-flex align-items-center justify-content-between mt-3">
            <h5>
              ${price} <span> /per person</span>
            </h5>
            <button className="btn booking__btn">
              <Link to={`/tours/${_id}`}>Book Now</Link>
            </button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default TourCard;

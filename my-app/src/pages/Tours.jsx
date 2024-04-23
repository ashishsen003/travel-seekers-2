import React, { useEffect, useState } from "react";
import { CommonSection } from "../shared/CommonSection";
import "../styles/tour.css";
import { Container, Row, Col } from "reactstrap";
import SearchBar from "../shared/SearchBar";
import TourCard from "../shared/TourCard";
import Newsletter from "../shared/Newsletter";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { getTour } from "../Redux/ToursReducer/action";
import { Sidebar } from "../components/Sidebar";
import Pagination from "./Pagination"; 
import loading from '../assets/loading.gif'
import { Img } from "@chakra-ui/react";

const Tours = () => {
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  const { isLoading, isError, tours, totalPages } = useSelector((store) => {
    return {
      isLoading: store.tourReducer.isLoading,
      isError: store.tourReducer.isError,
      tours: store.tourReducer.tours,
      totalPages: store.tourReducer.totalPages, 
    };
  }, shallowEqual);

  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const pages = Math.ceil(8/4)
    setPageCount(pages)

    const params = {
      _q: searchParams.get("q"),
      _limit: 12,
      _page: page,
      _sort: searchParams.get("order") && "price",
      _order: searchParams.get("order"),
    };
    dispatch(getTour(params));
  }, [dispatch, searchParams, page]);

  // console.log(tours);
  

  return (
    <>
      <CommonSection title="All Tours" />
      <section>
        <Container>
          <Row>
            <SearchBar />
            <Sidebar />
          </Row>
        </Container>
      </section>
      <section className="pt-0">
        <Container>
          {isLoading && <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'  }}> <img src={loading} style={{width: '20%'}} /> </div>}
          {isError && <h1>Errorrrr...</h1>}
          <Row>
            {!isLoading && !isError && tours?.map((tour) => (
              <Col lg="3" gap="10px" key={tour.id}>
                <TourCard tour={tour} />
              </Col>
            ))}
          {/* </Row>
          <Row> */}
            <Col lg="12">
              <div className="pagination d-flex align-items-center justify-content-center mt-4 gap-3">
                {/* {!isLoading && <Pagination
                totalPages={totalPages}
                currentPage={page}
                setCurrentPage={setPage}
                />} */}
                {[...Array(pageCount).keys()].map(number => (
                  <span key={number} onClick={()=> setPage(number)} className={page===number ? 'active__page' : ''} >
                    {number+1}
                  </span>

                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <Newsletter />
    </>
  );
};

export default Tours;

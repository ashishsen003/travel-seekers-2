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
import loading from "../assets/loading.gif";
import { Img } from "@chakra-ui/react";
import useFetch from "../hooks/useFetch.js";
import { BASE_URL } from "../utils/config";

const Tours = () => {
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);

  const {
    data: tours,
    loading,
    error,
  } = useFetch(`${BASE_URL}/tours?page=${page}`);
  const { data: tourCount } = useFetch(`${BASE_URL}/tours/search/getTourCount`);

  // const { isLoading, error, tours, totalPages } = useSelector((store) => {
  //   return {
  //     isLoading: store.tourReducer.isLoading,
  //     error: store.tourReducer.error,
  //     tours: store.tourReducer.tours,
  //     totalPages: store.tourReducer.totalPages,
  //   };
  // }, shallowEqual);

  // const [searchParams] = useSearchParams();
  // const dispatch = useDispatch();

  useEffect(() => {
    const pages = Math.ceil(tourCount / 8);
    setPageCount(pages);
    window.scrollTo(0,0)
    // const params = {
    //   _q: searchParams.get("q"),
    //   _limit: 12,
    //   _page: page,
    //   _sort: searchParams.get("order") && "price",
    //   _order: searchParams.get("order"),
    // };
    // dispatch(getTour(params));
  }, [page, tourCount, tours]);

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
          {loading && (
            <div className="loading__div">
              <img src={loading}/>
            </div>
          )}
          {error && <h4 className="text-center pt-5">{error}</h4>}
          {!loading && !error && (
            <Row>
              {tours?.map((tour) => (
                <Col lg="3" className="mb-4" key={tour.id}>
                  <TourCard tour={tour} />
                </Col>
              ))}
              <Col lg="12">
                <div className="pagination d-flex align-items-center justify-content-center mt-4 gap-3">
                  {/* {!isLoading && <Pagination
                totalPages={totalPages}
                currentPage={page}
                setCurrentPage={setPage}
                />} */}
                  {[...Array(pageCount).keys()].map((number) => (
                    <span
                      key={number}
                      onClick={() => setPage(number)}
                      className={page === number ? "active__page" : ""}
                    >
                      {number + 1}
                    </span>
                  ))}
                </div>
              </Col>
            </Row>
          )}
        </Container>
      </section>
      <Newsletter />
    </>
  );
};

export default Tours;

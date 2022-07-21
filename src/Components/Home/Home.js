import React from "react";
import Courses from "../Course/Courses";
import Admission from "./Admission/Admission";
import Banner from "./Banner/Banner";
import JobCourse from "./JobCourse";
import Navigation from "./Navigation";
import Review from './Review/Review'
import Reviews from "./Reviews/Reviews";
import Header from '../Shared/Header/Header';

const Home = () => {
  return (
    <div className="">
      <Header></Header>
      <Banner></Banner>
      <Navigation></Navigation>
      <Courses></Courses>
      <Admission></Admission>
      <JobCourse></JobCourse>
      <Reviews></Reviews>
      <Review></Review>
    </div>
  );
};

export default Home;
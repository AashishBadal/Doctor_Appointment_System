import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import DoctorsList from "../components/DoctorsList";

const Home = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <DoctorsList />
    </div>
  );
};

export default Home;

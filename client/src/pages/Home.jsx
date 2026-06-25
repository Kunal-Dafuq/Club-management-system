import Hero from "../components/home/Hero";
import ClubUniverse from "../components/shared/ClubUniverse";
import UpcomingEvents from "../components/home/UpcomingEvents";
import StatsCards from "../components/home/StatsCards";
const Home = () => {
  return (
    <>
      <Hero />
      <ClubUniverse />
      <UpcomingEvents />
      <StatsCards />
    </>
  );
};

export default Home;
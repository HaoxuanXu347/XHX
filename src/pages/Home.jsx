import Banner from "../components/Banner.jsx";
import HouseList from "../components/HouseList.jsx";

function Home() {
  return (
    <>
      <Banner>
        <div>Providing houses all over the world</div>
      </Banner>
      <HouseList />
    </>
  );
}

export default Home;
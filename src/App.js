import "./App.css";
import Row from "./Row/Row";
import requests from "./API/requests";
import Banner from "./Banner/Banner";
import Navbar from "./Navbar/Navbar";
function App() {
  return (
    <div className="App">
      <Navbar />
      <Banner />
      <Row
        title="NETFLIX ORIGINALS"
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow={true}
      />
      <Row
        title="TRENDING NOW"
        fetchUrl={requests.fetchTrending}
        isLargeRow={true}
      />
      <Row
        title="TOP RATED"
        fetchUrl={requests.fetchTopRated}
        isLargeRow={true}
      />
      <Row title="ACTION MOVIES" fetchUrl={requests.fetchActionMovies} />
      <Row title="COMEDY MOVIES" fetchUrl={requests.fetchComedyMovies} />
      <Row title="HORROR MOVIES" fetchUrl={requests.fetchHorrorMovies} />
      <Row title="ROMANCE MOVIES" fetchUrl={requests.fetchRomanceMovies} />
      <Row title="DOCUMENTARIES" fetchUrl={requests.fetchDocumantaries} />
    </div>
  );
}

export default App;

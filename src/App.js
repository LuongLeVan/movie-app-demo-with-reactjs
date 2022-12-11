import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Movies from "./pages/Movies/Movies";
import Series from "./pages/Series/Series";
import Search from "./pages/Search/Search";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import NavbarBottom from "./components/NavbarBottom/NavbarBottom";
function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
      <Route path={"/"} element={<Home/>} />
      <Route  path={"/movies"} element={<Movies/>} />
      <Route  path={"/series"} element={<Series/>} />
      <Route  path={"/search"} element={<Search/>} />
      </Routes>
      <Footer/>
      <NavbarBottom/>
    </div>
  );
}

export default App;

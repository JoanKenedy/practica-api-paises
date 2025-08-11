import { useEffect } from 'react';
import './App.css'
import CountryRanking from './components/CountryRanking'
import { useCountryStore } from './store';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CountryDetail from './components/CountryDetail';
import logo from './assets/Logo.svg'

function App() {
const fetchCountries = useCountryStore((state) => state.fetchData);

useEffect(() => {
  fetchCountries();
}, [])

  return (
    <BrowserRouter>
      <div className="main flex flex-col items-center  lg:mx-auto ">
        <div className="container-app w-full flex flex-col justify-center items-center gap-15 lg:max-w-[1400px] ">
          <h1 className="mt-10 mb-4">
            <img src={logo} alt="Logo World Ranks" className="w-[200px] " />
          </h1>
          <div className="w-full mx-auto px-4 py-6">
            <Routes>
              <Route path="/" element={<CountryRanking />} />
              <Route path="/country/:code" element={<CountryDetail />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App

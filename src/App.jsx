
import { useState } from 'react'
//CSS
import './App.css'
//components
import Weather from "./components/Weather/Weather"
import Search from './components/Search/Search';
import UnitToggle from './components/UnitToggle/UnitToggle';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  const [city, setCity] = useState("Toronto");
  const [unit, setUnit] = useState("metric");
  const [backgroundClass, setBackgroundClass] = useState("bg-gradient-to-r from-violet-500 to-white");


  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === "metric" ? "imperial" : "metric"));
  };

  return (
    <>
      <div className={` ${backgroundClass}`}>
        <Header/> 
        <div className='flex flex-col sm:flex-row items-center justify-center gap-8 w-full p-4'>
        <UnitToggle unit={unit} toggleUnit={toggleUnit}/>          
        <Search onSearch={setCity}/>      
        </div>  
        <Weather cityName={city} unit={unit} onBackgroundChange={setBackgroundClass} />
        <Footer/>
      </div>
    </>
  )
}

export default App

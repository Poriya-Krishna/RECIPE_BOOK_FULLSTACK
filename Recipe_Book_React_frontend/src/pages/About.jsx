import React from 'react'; 
import RollingGallery from './RollingGallery'; 
import CircularGallery from './CircularGallery'; 

export default function About() { 
  return ( 
    <div style={{ padding: 20, color: '#e6eef8' }}> 
    <h1>About Us – PORIYA’s Étoile</h1> 
    <p> At PORIYA’s Étoile, dining transcends the ordinary. We believe that a restaurant should be more than a place to eat — it should be a destination of luxury, artistry, and unforgettable experiences. </p> 
    <p> What began as a single dream to bring culinary perfection to life has now evolved into a global icon of fine dining. From the vibrant streets of Mumbai to the dazzling lights of Las Vegas, the pulse of New York, the sunshine of California, and beyond, PORIYA’s Étoile has become synonymous with elegance and excellence on a worldwide stage. </p> 
    <p> Each of our branches reflects the spirit of its city, yet remains faithful to the Étoile philosophy: 
      <ul> 
        <li>Artistry on the Plate — Every dish is crafted as a masterpiece, blending flavor with innovation.</li> 
        <li>Luxury in Every Detail — From interiors to wine pairings, sophistication is our language.</li>
         <li>A Global Culinary Family — A celebration of world flavors, brought together by passion and precision.</li> 
         </ul> With Michelin-star aspirations and a presence in some of the world’s most prestigious cities, PORIYA’s Étoile isn’t just a restaurant — it’s an experience reserved for those who seek the extraordinary.
      </p> 
      <h1>Cusines Offered</h1>
      
       {/* Added RollingGallery */} 
       <RollingGallery autoplay={true} pauseOnHover={true} /> 
       <b><br></br></b> 

       <h1>Location</h1> 
       {/* Added CircularGallery at the bottom */}
        <div style={{ height: '600px', position: 'relative', marginTop: 40 }}> 
          <CircularGallery bend={3} textColor="#ffffff" borderRadius={0.05} scrollEase={0.02} /> 
          </div>
        </div> 
      ); 
 }
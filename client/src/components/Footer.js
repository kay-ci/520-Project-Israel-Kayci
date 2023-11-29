import { useState } from 'react';


function Footer(){

  const [popup, setPopup] = useState(true);

  return (
    <>
      <footer className="my-footer">
        <button className="foot-button" onClick={() => setPopup(!popup)}>?</button>
        <p>Israel Aristide - Kayci Davila 2023</p>
        

      </footer>

      {popup && <section id="popup">
        <section>
          <button className="foot-button" onClick={() => setPopup(!popup)}>x</button>
          <h1>Beyond our earth</h1>

          <p>
            This visualization of NASA's meteorite dataset is made to allow users to explore exactly
            what is beyond our point of view.
          </p>

          <p>
            The dataset comes from <a 
              href="https://www.kaggle.com/datasets/sujaykapadnis/meteorites-dataset">
                kaggle.com
            </a> published by Sujay Kapadnis. 
            The data inside is provided by <a 
              href="https://data.nasa.gov/Space-Science/Meteorite-Landings/gh4g-9sfh/data">
                NASA
            </a>
          </p>
        </section>
      </section>}
    </>
  );
}
export default Footer;
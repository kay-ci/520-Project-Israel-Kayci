import { useState, useEffect } from 'react';


function Footer(){

  const [popup, setPopup] = useState(!localStorage.getItem('visited'));
  const [country, setCountry] = useState(
    localStorage.getItem('country') ? 
      localStorage.getItem('country') : 'CA');
  const [countries, setCountries] = useState({'🇨🇦': 'CA'});

  useEffect(() => {

    fetch('/meteorites/countries').then(res => {
      if (res.ok) {
        return res.json();
      }
    }).then(json => {
      setCountries(json.data);
    });

    if (!localStorage.getItem('country')) {
      localStorage.setItem('country', 'CA');
    }

    if (!localStorage.getItem('visited')) {
      localStorage.setItem('visited', 'true');
    }

  }, []);

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
          <p>Please select your country</p>
          <select
            onChange = {(e) => {
              setCountry(e.target.value);
              localStorage.setItem('country', e.target.value);
              window.location.reload();
            }
            }
          >
            {Object.keys(countries).map(x => {
              if (country === countries[x]) {
                return <option selected value={countries[x]}>{x}</option>;
              }
              return <option value={countries[x]}>{x}</option>;
            })}
          </select>

        </section>
      </section>}
    </>
  );
}
export default Footer;
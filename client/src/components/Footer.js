import { useState } from 'react';


function Footer(){

  const [popup, setPopup] = useState(false);

  return (
    <>
      <footer className="my-footer">
        <button onClick={() => setPopup(!popup)}>?</button>
        <p>Israel Aristide - Kayci Davilla 2023</p>
      </footer>

      {popup && <section id="popup">
        <button onClick={() => setPopup(!popup)}>x</button>
        <h1>Beyond our earth</h1>

        <p>
        Include some text to explain the goal of the visualization.
Display an attribution to the source of the dataset.
Display your names in some small footer area or some such.
Choose appropriate HTML elements based on semantics (i.e. not just divs)
        </p>

      </section>}
    </>
  );
}
export default Footer;
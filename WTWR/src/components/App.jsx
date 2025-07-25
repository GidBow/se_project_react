import { useState } from "react";
import "../blocks/App.css";
import Header from "./header";
import Footer from "./Footer";
import Main from "./Main";

function App() {
  return (
    <>
      <div className="page">
        <div className="page__content">
          <Header />
          <Main />
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;

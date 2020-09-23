import React from "react";

import "./homepage.styles.scss";

import Directory from '../../components/directory/directory.component';

// creo funct component per la home page, a questo punto non mi servono state e lifecycle meth
const HomePage = ({history}) => (
  <div className="homepage">
    <Directory />
  </div>
);

export default HomePage;

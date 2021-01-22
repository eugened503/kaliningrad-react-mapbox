import React from 'react';
import { Link } from 'react-router-dom';
import './HomeScreen.css';

function HomeScreen() {
  return (
    <div className="screen">
      <h1 className="screen__title">Туристические точки притяжения Калиниграда</h1>
      <Link className="screen__link" to="/map"><button className="screen__button">Перейти к карте</button></Link>
    </div>
  )
}

export default HomeScreen;
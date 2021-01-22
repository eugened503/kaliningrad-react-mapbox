import React, { useState, useEffect } from 'react';
import './Map.css';
import { Link } from 'react-router-dom';
import ListItem from "../ListItem/ListItem"
import ReactMapGl, { Marker, Popup } from "react-map-gl";
import placeholder from "../images/placeholder.svg";
import * as points from "../data/points.json";
import MAPBOX_TOKEN from "../constants/constants";

function Map() {
  const [selectedPoint, setSelectedPoint] = useState(null); //стейт для выбранных точек на карте
  const [viewport, setViewport] = useState({ //стейт с картой Калининграда
    latitude: 54.710128, //широта
    longitude: 20.5105838, //долгота
    width: "70vw",
    height: "100vh",
    zoom: 10
  })

  useEffect(() => { //закрытие при нажатии на клавишу escape
    const listener = e => {
      if (e.key === "Escape") {
        setSelectedPoint(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

  const overlayVisible = (e) => { // закрытие по оверлею
    if (e.target.classList.contains('overlays')) {
      setSelectedPoint(null)
    }
  }

  return (
    <div className="map">
      <div className="map__list">
        {points.features.map((point) => (
          <ListItem
            key={point.properties.ID}
            nameItem={point.properties.DESCRIPTIO}
            onClick={e => {
              e.preventDefault();
              setSelectedPoint(point);
            }}

          />
        ))}
        <Link to="/" className="map__link"><button className="map__button">На главную</button></Link>
      </div>
      <div className="map__view" onClick={e => overlayVisible(e)}>
        <ReactMapGl
          {...viewport}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          mapStyle="mapbox://styles/onthewall/ckk6yvptk16d717o7oh69zhal"
          onViewportChange={viewport => {
            setViewport(viewport);
          }}
        >
          {points.features.map((point) => (
            <Marker
              key={point.properties.ID}
              latitude={point.geometry.coordinates[1]}
              longitude={point.geometry.coordinates[0]}
            >
              <img className="maker-img" src={placeholder} alt="icon" onClick={e => {
                e.preventDefault();
                setSelectedPoint(point);
              }} />
            </Marker>
          ))}

          {selectedPoint ? (
            <Popup
              latitude={selectedPoint.geometry.coordinates[1]}
              longitude={selectedPoint.geometry.coordinates[0]}
              onClose={() => {
                setSelectedPoint(null);
              }}
            >
              <div>
                <p>{selectedPoint.properties.DESCRIPTIO}</p>
              </div>
            </Popup>
          ) : null}
        </ReactMapGl>
      </div>
    </div>
  )
}

export default Map;
import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';

import { listLogEntries } from './API';

const App = () =>{

  const [ viewport, setViewport ] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 37.78,
    longitude: -122.41,
    zoom: 0
  });

  const [ logList, setLogList ] = useState([]);
  const [ showPopup, setShowPopup ] = useState({});

  useEffect(() => {
    const getLogList = async () => { 
      const list = await listLogEntries(); 
      setLogList(list);
      console.log(list);
    }
    getLogList();
  }, []);

  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/thecjreynolds/ck117fnjy0ff61cnsclwimyay"
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={setViewport}
    >
      {
        logList.map( entry => (
          <>
          <Marker 
            key={entry._id}
            latitude={entry.latitude} 
            longitude={entry.longitude} 
            offsetLeft={-12}
            offsetTop={-24}
          >
            <div
              onClick={() => setShowPopup({
                ...showPopup,
                [entry._id] : true,
              })}
            >
              <svg 
                className="feather feather-map-pin" 
                fill="none" 
                stroke="#28c7fa" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="1.5" 
                viewBox="0 0 24 24" 
                width="20" 
                height="20">
                  <path d="M 21 10 c 0 7 -9 13 -9 13 s -9 -6 -9 -13 a 9 9 0 0 1 18 0 Z" />
                  <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
          </Marker>
          {
            showPopup[ entry._id ] ? (
              <Popup
                latitude={entry.latitude} 
                longitude={entry.longitude}
                closeButton={true}
                closeOnClick={false}
                onClose={() => setShowPopup({
                  ...showPopup,
                  [entry._id] : false,
                })}
                anchor="top"
              >
                <div>
                  <h3>{entry.title}</h3>
                  <p>{entry.comments}</p>
                </div>
              </Popup>
            ) : null
          }
          </>
        ))
      }
    </ReactMapGL>
  );
}

export default App;

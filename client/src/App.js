import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';

import { listLogEntries } from './API';
import LogEntryForm from './components/LogEntryForm';

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
  const [ addEntryLocation, setAddEntryLocation ] = useState(null);

  useEffect(() => {
    const getLogList = async () => { 
      const list = await listLogEntries(); 
      setLogList(list);
      console.log(list);
    }
    getLogList();
  }, []);

  const showAddMarkerPopup = (event) => {
    const [ longitude, latitude ] = event.lngLat;
    setAddEntryLocation({
      latitude,
      longitude,
    })
  };

  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/thecjreynolds/ck117fnjy0ff61cnsclwimyay"
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={setViewport}
      onDblClick={showAddMarkerPopup}
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
                dynamicPosition={true}
                onClose={() => setShowPopup({})}
                anchor="top"
              >
                <div className="popup">
                  <h3>{entry.title}</h3>
                  <p>{entry.comments}</p>
                  <small>{new Date(entry.visitDate).toLocaleDateString}</small>
                </div>
              </Popup>
            ) : null
          }
          </>
        ))
      }
      {
        addEntryLocation ? (
          <>
            <Marker 
              latitude={addEntryLocation.latitude} 
              longitude={addEntryLocation.longitude} 
              offsetLeft={-12}
              offsetTop={-24}
            >
              <div>
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
            <Popup
              latitude={addEntryLocation.latitude} 
              longitude={addEntryLocation.longitude}
              closeButton={true}
              closeOnClick={false}
              dynamicPosition={true}
              onClose={() => setAddEntryLocation(null)}
              anchor="top"
            >
              <div className="popup">
                <LogEntryForm />
              </div>
            </Popup>
          </>
        )
          :
          null
      }
    </ReactMapGL>
  );
}

export default App;

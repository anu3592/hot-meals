import React, { useEffect, useState, useRef } from 'react';
import classes from './map.module.css';
import "leaflet/dist/leaflet.css";
import { Address } from '../components/action';
import L from 'leaflet';
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    useMapEvents,
} from 'react-leaflet';
import { toast } from 'react-toastify';
import useGeoLocation from '../hooks/useGeoLocation';
import { useDispatch } from 'react-redux';


const ZOOM_LEVEL = 13;

/*const markerIcon = new L.Icon({
    iconUrl: require('../img/marker.png'),
    iconSize: [35, 45],
})*/

export default function Map({ readonly, location, onChange }) {
    const dispatch = useDispatch();
    const [locationName, setLocationName] = useState('');
    const [center, setCenter] = useState({ lat: 13.08622, lng: 80.248357 });
    const mapRef = useRef();
    const loc = useGeoLocation();

    const takeAction = (data) => {
        dispatch(Address(data));
    }
    const showMyLocation = () => {
        if (loc.loaded && !loc.error) {
            getLocationName(loc.coordinates.lat, loc.coordinates.lng);
            mapRef.current.flyTo([loc.coordinates.lat, loc.coordinates.lng], ZOOM_LEVEL, { duration: 2 })
            /*const {current = {}} = mapRef;
            const {leafletElement: map} = current;
            map.flyTo([loc.coordinates.lat,loc.coordinates.lng],13);*/
            //console.log(loc.coordinates.lat, loc.coordinates.lng);
            /*const map = mapRef.current;
            if(map!=null)
            {
                map.flyTo([loc.coordinates.lat, loc.coordinates.lng], ZOOM_LEVEL, {
                    duration:2
                });
            }*/
        }
        else {
            alert(loc.error.message);
        }
    }
    function getLocationName(lat, lng) {
        // Call reverse geocoding API to get location name
        fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`)
            .then(response => response.json())
            .then(data => {
                // Extract location name from response and update state
                setLocationName(data.display_name);
            })
            .catch(error => {
                console.error('Error fetching location name:', error);
            });
            
            takeAction(locationName);
    }
    return (
        <div className="w-full h-full">
            <MapContainer
                className={classes.map}
                center={center}
                zoom={ZOOM_LEVEL}
                ref={mapRef}
            >
                <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />

                {loc.loaded && !loc.error && (
                    <Marker position={[loc.coordinates.lat, loc.coordinates.lng]}></Marker>
                )}

            </MapContainer>

            <div className='flex flex-col -4'>
                <button type="button" className='m-1 p-2 w-[100px] text-white bg-blue-500 border-none' onClick={showMyLocation}>Locate Me</button>
                <h1>(Click two times)</h1>
            </div>
            {/*<MapContainer
                className={classes.map}
                center={[0,0]}
                zoom={1}
                dragging={!readonly}
                touchZoom={!readonly}
                doubleClickZoom={!readonly}
                scrollWheelZoom={!readonly}
                boxZoom={!readonly}
                keyboard={!readonly}
                attributionControl={false}
            >
                {/*You can add images on top of your map as a Tile Layer. 
                Tile Layers are placed overtop of a map tile at a specific zoom level. 
                With enough tiles, you can supplement Google's map data for the entire map, 
                at multiple zoom levels. 
                <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'/>
                <FindButtonAndMarker
                    readonly={readonly}
                    location={location}
                    onChange={onChange}
                />
    </MapContainer>*/}
        </div>
    );
}

/*function FindButtonAndMarker({readonly, location, onChange})
{
    const [position, setPosition] = useState(location);

    useEffect(()=>{
        if(readonly){
            map.setView(position, 13);
            return;
        }
        if(position) onChange(position);
    }, [position]);
    const map=useMapEvents({
        click(e){
            !readonly && setPosition(e.latlng);
        },
        locationfound(e) {
            setPosition(e.latlng);
            map.flyTo(e.latlng,13);
        },
        locationerror(e){
            toast.error(e.message);
        },
    });
    return(
       <>
        {
            !readonly && (
                <button
                    type='button'
                    className={classes.find_location}
                    onClick={()=>map.locate()}
                >
                    Find My Location
                </button>
            )
        }

        {
            position && (
                <Marker
                    eventHandlers={{
                        dragend: e=>{
                            setPosition(e.target.getLatLng());
                        },
                    }}
                    position={position}
                    
                    draggable={!readonly}
                >
                    <Popup>Shipping Location</Popup>
                </Marker>
            )
        }
       </> 
    )
}*/
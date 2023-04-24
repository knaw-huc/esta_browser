import React from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup, Polyline} from 'react-leaflet';
import 'leaflet-arrowheads';
import "../assets/css/leaflet.css";


function EstaMap(voyage) {
    return (
        <MapContainer center={[-8.511794, 117.010471]} zoom={3}>
            <TileLayer
                url="https://d.tile.openstreetmap.de/{z}/{x}/{y}.png"
                attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            />
            {voyage.voyage.sub_voyage.map((item) => {
                console.log(item);
                if (item.dep_coords[0].location_latitude !== null && item.dep_coords[0].location_longitude !== null && item.arr_coords[0].location_latitude !== null && item.arr_coords[0].location_longitude !== null) {
                    return <Polyline positions={[
                        [item.dep_coords[0].location_latitude, item.dep_coords[0].location_longitude], [item.arr_coords[0].location_latitude, item.arr_coords[0].location_longitude],
                    ]} color={'#BB0000'} weight={1} />
                }})}
        </MapContainer>
    )
}

export default EstaMap;
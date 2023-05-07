import React from "react";
import {IResultList} from "../misc/interfaces";
import {MapContainer, Polyline, TileLayer} from "react-leaflet";
import {Fragment} from "react";

export default function SearchMap(props: {data: IResultList}) {
    return (
            <div className="searchMapContainer">
                <MapContainer center={[-8.511794, 60.010471]} zoom={3}>
                    <TileLayer
                        url="https://d.tile.openstreetmap.de/{z}/{x}/{y}.png"
                        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                    />

                    <Fragment>
                        {props.data.items.map((item, index) => {
                            return (<>
                                {item.sub_voyage.map((el, elIndex) => {
                                    if (el.arrival_longitude !== null && el.arrival_latitude !== null && el.dep_latitude !== null && el.arrival_longitude !== null) {
                                    return (<Polyline positions={[
                                        [el.dep_latitude, el.dep_logitude], [el.arrival_latitude, el.arrival_longitude],
                                    ]} color={'#BB0000'} weight={1} opacity={0.4}/>)}
                                })}
                            </>)
                            })})


                    </Fragment>
                </MapContainer>
            </div>
    )
}




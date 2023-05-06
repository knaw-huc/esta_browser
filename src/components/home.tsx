import React from 'react';
import {Fragment} from "react";
import {useState, useEffect} from "react";
import {IFacetValue, ISearchObject, ISearchValues, ITrip} from "../misc/interfaces";
import {HOME, SERVICE} from "../misc/config";
import {Base64} from "js-base64";
import {useNavigate} from "react-router-dom";
import {MapContainer, Polyline, TileLayer} from "react-leaflet";

function Home() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<ITrip[]>([]);
    let navigate = useNavigate();
    document.title ="ESTA Voyages: Home";


    async function fetch_data() {
        const url = SERVICE + "/get_global" ;
        const response = await fetch(url);
        const json = await response.json();
        setData(json);
        setLoading(false);
    }

    function goSearch() {
        let searchStruc: ISearchObject = {
            searchvalues: [],
            page: 1,
            page_length: 30,
            sortorder: "titel"
        };
        const code: string = Base64.encode(JSON.stringify(searchStruc));
        navigate("search/" + code);
    }

    /*useEffect(() => {
        fetch_data();
    }, [loading]);*/

    return (
        <div className="homeContainer">
            <MapContainer center={[-8.511794, 40.010471]} zoom={3}>
                <TileLayer
                    url="https://d.tile.openstreetmap.de/{z}/{x}/{y}.png"
                    attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                />
               {/* {!loading && (
                    <Fragment>
                        {data.map((item, index) => {
                            return (
                                <Polyline positions={[
                                    [item.dep_lat, item.dep_long], [item.arr_lat, item.arr_long],
                                ]} color={'#BB0000'} weight={1} opacity={0.1}/>
                            )
                        })}
                    </Fragment>
                )}*/}
            </MapContainer>


        </div>
    )

}

export default Home;
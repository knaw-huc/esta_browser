import React from 'react';
import {Fragment} from "react";
import {useState, useEffect} from "react";
import {IFacetValue, IResultList, ISearchObject, ISearchValues, ITrip} from "../misc/interfaces";
import {HOME, SERVICE} from "../misc/config";
import {Base64} from "js-base64";
import {useNavigate} from "react-router-dom";
import {MapContainer, Polyline, TileLayer} from "react-leaflet";

function Home() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<IResultList>({amount: 0, pages: 0, items: []});
    let navigate = useNavigate();
    document.title ="ESTA Voyages: Home";


    async function fetch_data() {
        let searchStruc: ISearchObject = {
            searchvalues: [],
            page: 1,
            page_length: 5000,
            sortorder: "titel"
        };
        const url = SERVICE + "/browse" ;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Origin': HOME
            },
            body: JSON.stringify(searchStruc)
        });
        const json: IResultList = await response.json();
        setData(json);
        setLoading(false);
        setLoading(false);
    }

    function goSearch() {
        let searchStruc: ISearchObject = {
            searchvalues: [],
            page: 1,
            page_length: 5000,
            sortorder: "titel"
        };
        const code: string = Base64.encode(JSON.stringify(searchStruc));
        navigate("search/" + code);
    }

    useEffect(() => {
        fetch_data();
    }, [loading]);

    return (
        <div className="homeContainer">
            <MapContainer center={[-8.511794, 40.010471]} zoom={3}>
                <TileLayer
                    url="https://d.tile.openstreetmap.de/{z}/{x}/{y}.png"
                    attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                />
                {!loading && (
                    <Fragment>
                        {data.items.map((item, index) => {
                            return (<>
                                {item.sub_voyage.map((el, elIndex) => {
                                    if (el.arrival_longitude !== null && el.arrival_latitude !== null && el.dep_latitude !== null && el.arrival_longitude !== null) {
                                        return (<Polyline positions={[
                                            [el.dep_latitude, el.dep_logitude], [el.arrival_latitude, el.arrival_longitude],
                                        ]} color={'#BB0000'} weight={1} opacity={0.2}/>)}
                                })}
                            </>)
                        })})


                    </Fragment>
                )}
            </MapContainer>


        </div>
    )

}

export default Home;
import React from "react";
import {useParams, useNavigate} from "react-router-dom";
import {useState, useEffect} from "react";
import {SERVICE, HOME} from "../misc/config";
import {IVoyage} from "../misc/interfaces";
import Subvoyage from "../elements/subvoyage";
import EstaMap from "../elements/estaMap";


function Detail() {
    const[loading, setLoading] = useState(true);
    const[voyage, setVoyage] = useState<IVoyage>({last_mutation: "", year: "", summary: "", sub_voyage: []});
    const params = useParams();

    async function fetch_data() {
        const url = SERVICE + "/voyage?id=" + params.id;
        const response = await fetch(url);
        const json: IVoyage = await response.json();
        setVoyage(json);
        setLoading(false);
    }






    useEffect(() => {
       fetch_data()
    }, [loading]);


    // @ts-ignore
    return (
        <div className="hcContentContainer">
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div>
                    <h1>Voyage</h1>
                    <div className="voyageHeader">
                        <div className="voyageHeaderLabel">Summary</div>
                        <div>{voyage.summary}</div>
                        <div className="voyageHeaderLabel">Year</div>
                        <div>{voyage.year}</div>
                        <EstaMap voyage={voyage}/>
                    </div>
                    <h2>Subvoyages</h2>
                    {voyage.sub_voyage.map((item, index) => {
                        return (
                            <Subvoyage subvoyage={item} key={index} />
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default Detail;
import React from "react";
import {useParams, useNavigate} from "react-router-dom";
import {useState, useEffect} from "react";
import {SERVICE, HOME} from "../misc/config";
import {IVoyage} from "../misc/interfaces";
import Subvoyage from "../elements/subvoyage";


function Detail() {
    const[loading, setLoading] = useState(true);
    const[voyage, setVoyage] = useState<IVoyage>({last_mutation: "", year: "", summary: "", subvoyages: []});
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
                    </div>
                    <h2>Subvoyages</h2>
                    {voyage.subvoyages.map((item, index) => {
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
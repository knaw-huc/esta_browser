import React from 'react';
import {Fragment} from "react";
import {useState, useEffect} from "react";
import {IFacetValue, ISearchObject, ISearchValues} from "../misc/interfaces";
import {HOME, SERVICE} from "../misc/config";
import {Base64} from "js-base64";
import {useNavigate} from "react-router-dom";

function Home() {
    let navigate = useNavigate();
    document.title ="ESTA Voyages: Home";

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

    return (
        <div className="hcContentContainer">
            <h2>ESTA Voyages</h2>
            <div>
                This is a demo for searching the ESTA voyages.
            </div>
            <div className="hcClickable" onClick={() => goSearch()}>Browse</div>


        </div>
    )

}

export default Home;
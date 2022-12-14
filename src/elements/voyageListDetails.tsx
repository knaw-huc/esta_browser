import React from "react";
import {useNavigate} from "react-router-dom";
import {IResultItem} from "../misc/interfaces";
import img from "../assets/img/manuscript.jpg";

function VoyageListDetails(props: {result: IResultItem}) {
    let navigate = useNavigate();

    return (<div className="hcResultListDetail">
        <h2>{props.result.summary}</h2>
        <div>{props.result.year}</div>
        <div className="detailLine">{props.result.sub_voyage.map((item, index) => {
            return (<div key={index} className="rolItem">{item.sub_dept_location} - {item.sub_arrival_location}</div>)
        })}</div>
        <div className="detailLine"><strong>Added on: 01/11/2021</strong></div>
        <div>
            <ul className="ManuscriptListBtns">
                <li onClick={() => {
                    window.scroll(0, 0);
                    navigate('/detail/' + props.result.voyage_id)}
                }>Details</li>
            </ul>
        </div>
    </div>);
}

export default VoyageListDetails;
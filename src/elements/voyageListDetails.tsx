import React, {useRef} from "react";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {IResultItem, ISetID} from "../misc/interfaces";
import img from "../assets/img/manuscript.jpg";

function VoyageListDetails(props: {result: IResultItem, setAnchor: ISetID, currentID: string}) {
    let navigate = useNavigate();
    let id = props.result.voyage_id as string;

    const scRef = useRef<HTMLDivElement>(document.createElement("div"));
    useEffect(() => {
        if (props.currentID === props.result.voyage_id) {
            scRef.current.scrollIntoView({});
        }
    });

    return (<div ref={scRef} className={`hcResultListDetail ref_${props.result.voyage_id}`}>
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
                    props.setAnchor(props.result.voyage_id);
                    navigate('/detail/' + props.result.voyage_id)}
                }>Details</li>
            </ul>
            <div className="navUpArrow" onClick={() => {
                window.scroll(0,0);
                props.setAnchor("0");
            }}>&#8593;</div>
        </div>
    </div>);
}

export default VoyageListDetails;
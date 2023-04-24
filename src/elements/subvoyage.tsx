import React from "react";
import {useState} from "react";
import {ISubVoyage} from "../misc/interfaces";
import {ReactFragment} from "react";
import {fillEmpty} from "../misc/functions";
import Transport from "./transport";
import Cargo from "./cargo";
import Slaves from "./slaves";

function Subvoyage(props: {subvoyage: ISubVoyage}) {
    const [visible, setVisible] = useState(true);

    return (
        <div className="subVoyageData">
            <div className="subVoyageHeader" onClick={() => {setVisible(!visible)}}>
                {visible ? (<React.Fragment>&#9660; </React.Fragment>) : (<React.Fragment>&#9658; </React.Fragment>)}
                {props.subvoyage.sub_dept_location} - {props.subvoyage.sub_arrival_location}
            </div>
            {visible &&  (
                <div className="subVoyageBody">
                <div className="subVoyagePlaces">
                <div className="leftColumn"><h3>Departure</h3>
                    <div className="subVoyageBodyLabel">Location of departure</div>
                    <div>{props.subvoyage.sub_dept_location}</div>
                    <div className="subVoyageBodyLabel">Location of departure standardized</div>
                    <div>{props.subvoyage.sub_dept_location_standardized}</div>
                    <div className="subVoyageBodyLabel">Status location of departure</div>
                    <div>{props.subvoyage.sub_dept_location_status}</div>
                    <div className="subVoyageBodyLabel">Date of departure as source</div>
                    <div>{props.subvoyage.sub_dept_date_as_source}</div>
                    <div className="subVoyageBodyLabel">Status date of departure as source</div>
                    <div>{props.subvoyage.sub_dept_date_status}</div>
                </div>
                <div className="rightColumn"><h3>Arrival</h3>
                    <div className="subVoyageBodyLabel">Location of arrival</div>
                    <div>{props.subvoyage.sub_arrival_location}</div>
                    <div className="subVoyageBodyLabel">Location of arrival standardized</div>
                    <div>{props.subvoyage.sub_arrival_location_standardized}</div>
                    <div className="subVoyageBodyLabel">Status location of arrival</div>
                    <div>{props.subvoyage.sub_arrival_date_status}</div>
                    <div className="subVoyageBodyLabel">Date of arrival as source</div>
                    <div>{props.subvoyage.sub_arrival_date_as_source}</div>
                    <div className="subVoyageBodyLabel">Status date of arrival as source</div>
                    <div>{props.subvoyage.sub_arrival_date_status}</div>
                </div>
                </div>
                <hr/>
                <div>
                    <div className="subVoyageBodyLabel">Type</div>
                    <div>{props.subvoyage.subvoyage_type}</div>
                    <div className="subVoyageBodyLabel">Source</div>
                    <div>{fillEmpty(props.subvoyage.sub_source)}</div>
                </div>
                    {props.subvoyage.slaves.slaves_total !== undefined && (<Slaves slaves={props.subvoyage.slaves}/>)}
                    {props.subvoyage.vessel.map((item, index) => {
                        return (<Transport transport={item} key={index}/>)
                    })}
                    {props.subvoyage.cargo.map((item, index) => {
                        return (<Cargo cargo={item} key={index}/>);
                    })}
            </div>)}
        </div>
    )

}

export default Subvoyage
import React from "react";
import {useState} from "react";
import {ISlaves} from "../misc/interfaces";
import SlaveGroup from "./slaveGroup";


function Slaves(props: { slaves: ISlaves }) {
    const [visible, setVisible] = useState(true);

    return (
        <div className="subVoyageData">
            <div className="subVoyageHeader" onClick={() => {
                setVisible(!visible)
            }}>
                {visible ? (<React.Fragment>&#9660; Slaves </React.Fragment>) : (
                    <React.Fragment>&#9658; Slaves </React.Fragment>)}
            </div>
            {visible && (
                <div className="subVoyageBody">
                    <div className="subVoyagePlaces">
                        <div className="leftColumn">
                            <div className="subVoyageBodyLabel">Total amount of slaves</div>
                            <div>{props.slaves.slaves_total}</div>
                            <div className="subVoyageBodyLabel">Status total amount of slaves</div>
                            <div>{props.slaves.slaves_total_status}</div>
                            <div className="subVoyageBodyLabel">Mortality</div>
                            <div>{props.slaves.slaves_mortality}</div>
                        </div>
                        <div className="leftColumn">
                            <div className="subVoyageBodyLabel">Type</div>
                            <div>{props.slaves.slaves_type}</div>
                            <div className="subVoyageBodyLabel">Source</div>
                            <div>{props.slaves.slaves_source}</div>
                            <div className="subVoyageBodyLabel">Notes</div>
                            <div>{props.slaves.slaves_notes}</div>
                        </div>
                    </div>
                    {props.slaves.groups.map((item, index) => {
                        return (<SlaveGroup group={item} nr={index} key={index}/>)
                    })}
                </div>)}
        </div>
    )
}

export default Slaves;
import React from "react";
import {useState} from "react";
import {ISlaveGroup} from "../misc/interfaces";
import {ReactFragment} from "react";


function SlaveGroup(props: { group: ISlaveGroup, nr: number }) {
    const [visible, setVisible] = useState(false);
    const index = props.nr + 1;
    return (
        <div className="subVoyageData">
            <div className="subVoyageHeader" onClick={() => {
                setVisible(!visible)
            }}>
                {visible ? (<React.Fragment>&#9660; Slave group {index}</React.Fragment>) : (
                    <React.Fragment>&#9658; Slave group {index}</React.Fragment>)}
            </div>
            {visible && (<div className="subVoyageBody">
                <div className="subVoyagePlaces">
                    <div className="leftColumn">
                        <div className="subVoyageBodyLabel">Age group</div>
                        <div>{props.group.gr_age_group}</div>
                        <div className="subVoyageBodyLabel">Ethnicity</div>
                        <div>{props.group.gr_ethnicity}</div>
                        <div className="subVoyageBodyLabel">Sex</div>
                        <div>{props.group.gr_sex}</div>
                    </div>
                    <div className="leftColumn">
                        <div className="subVoyageBodyLabel">Quantity</div>
                        <div>{props.group.gr_quantity}</div>
                        <div className="subVoyageBodyLabel">Physical state</div>
                        <div>{props.group.gr_physical_state}</div>
                        <div className="subVoyageBodyLabel">Notes</div>
                        <div>{props.group.gr_notes}</div>
                    </div>
                </div>

            </div>)}
        </div>
    )
}

export default SlaveGroup;
import React from "react";
import {useState} from "react";
import {ITransport} from "../misc/interfaces";
import {ReactFragment} from "react";
import {fillEmpty} from "../misc/functions";

function Transport(props: {transport: ITransport}) {
    const [visible, setVisible] = useState(true);

    return (
        <div className="subVoyageData">
            <div className="subVoyageHeader" onClick={() => {setVisible(!visible)}}>
                {visible ? (<React.Fragment>&#9660; Transport </React.Fragment>) : (<React.Fragment>&#9658; Transport </React.Fragment>)}
            </div>
            {visible &&  (<div className="subVoyageBody">
                <div>
                    <div className="subVoyageBodyLabel">Name</div>
                    <div>{props.transport.transport_name}</div>
                    <div className="subVoyageBodyLabel">Type</div>
                    <div>{fillEmpty(props.transport.transport_type)}</div>
                    <div className="subVoyageBodyLabel">Capacity</div>
                    <div>{props.transport.transport_capacity}</div>
                    <div className="subVoyageBodyLabel">Source</div>
                    <div>{fillEmpty(props.transport.transport_source)}</div>
                </div>

            </div>)}
        </div>
    )
}

export default Transport;
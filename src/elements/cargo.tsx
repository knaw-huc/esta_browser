import React from "react";
import {useState} from "react";
import {ICargo} from "../misc/interfaces";
import {ReactFragment} from "react";
import {fillEmpty} from "../misc/functions";

function Cargo(props: {cargo: ICargo}) {
    const [visible, setVisible] = useState(false);

    return (<div className="subVoyageData">
        <div className="subVoyageHeader" onClick={() => {setVisible(!visible)}}>
            {visible ? (<React.Fragment>&#9660; </React.Fragment>) : (<React.Fragment>&#9658;  </React.Fragment>)}
            Cargo: {props.cargo.cargo_commodity}
        </div>
        {visible &&  (<div className="subVoyageBody">
            <div>
                <div className="subVoyageBodyLabel">Commodity</div>
                <div>{props.cargo.cargo_commodity}</div>
                <div className="subVoyageBodyLabel">Quantity</div>
                <div>{props.cargo.cargo_quantity}</div>
                <div className="subVoyageBodyLabel">Unit</div>
                <div>{props.cargo.cargo_unit}</div>
                <div className="subVoyageBodyLabel">Value</div>
                <div>{fillEmpty(props.cargo.cargo_value)}</div>
                <div className="subVoyageBodyLabel">Source</div>
                <div>{fillEmpty(props.cargo.cargo_source)}</div>
            </div>

        </div>)}
    </div>)
}

export default Cargo;
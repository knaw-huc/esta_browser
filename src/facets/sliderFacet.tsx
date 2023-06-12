import React from "react";
import {Fragment} from "react";
import {IFacetValue, ISendCandidate} from "../misc/interfaces";
import {useState, useEffect} from "react";
import {SERVICE} from "../misc/config";
import {Slider} from "@mui/material";

function SliderFacet(props: {parentCallback: ISendCandidate, name: string, field: string, from: number, to: number}) {
    const [hidden, setHidden] = useState(true);
    const [value, setValue] = React.useState<number[]>([props.from, props.to]);

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };

    const sendSelect = () => {
        props.parentCallback({facet: props.name, field: props.field, candidate: value[0] + "-" + value[1]}, true);
    }


    return (
        <div className="hcFacet">
            <div className="hcFacetTitle" onClick={() => setHidden(!hidden)}>
                <span>{props.name}</span>
                <span className="hcIconHelp">
                    {hidden ? (<Fragment>+</Fragment>) : (<Fragment>-</Fragment>)}
                </span>
            </div>
            {!hidden &&
            <div><div className="hcSlider">
                <Slider getAriaLabel={() => 'Minimum distance'}
                        value={value}
                        step={1}
                        min={props.from}
                        max={props.to}
                        valueLabelDisplay="auto"
                        onChange={handleChange}
                        size="small"
                        area-label="small"
                        disableSwap={true}
                />
            </div>
            <div>
                <button className="sliderSelectBtn" onClick={sendSelect}>Select</button>
                <div className="sliderSelect">[{value[0]} - {value[1]}]</div>

            </div>
            </div>
            }
        </div>
    );
}

export default SliderFacet;
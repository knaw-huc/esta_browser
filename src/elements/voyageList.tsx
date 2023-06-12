import React from "react";
import {IResultList, IResultItem, ISetID} from "../misc/interfaces";
import VoyageListDetails from "./voyageListDetails";

function VoyageList(props: {result: IResultList, setAnchor: ISetID, currentID: string}) {
    return (
        <div>
        {props.result.items.map((item: IResultItem, index: number) => {
            return (
                <VoyageListDetails result={item} setAnchor={props.setAnchor} currentID={props.currentID} key={index} />
            )
            })}
        </div>)
}

export default VoyageList
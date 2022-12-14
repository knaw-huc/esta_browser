import React from "react";
import {IResultList, IResultItem} from "../misc/interfaces";
import VoyageListDetails from "./voyageListDetails";

function VoyageList(props: {result: IResultList}) {
    return (
        <div>
        {props.result.items.map((item: IResultItem, index: number) => {
            return (
                <VoyageListDetails result={item} key={index}/>
            )
            })}
        </div>)
}

export default VoyageList
import React from "react";
import {useState, useEffect} from "react";
import {SERVICE} from "../misc/config";
import {IFacetValue, ISendCandidate} from "../misc/interfaces";


function AutoCompleteFacet(props: {parentCallback: ISendCandidate, name: string, field: string}) {

    const [more, setMore] = useState(true);
    const [filter, setFilter] = useState("");
    const [data, setData] = useState<IFacetValue[]>([]);
    let url: string = SERVICE + "elastic/nested_facet/lading.soort/short";

    const [loading, setLoading] = useState(true);


    async function fetchData() {
        if (more) {
            url = SERVICE + "elastic/nested_facet/lading.soort/short/" + filter;
        } else {
            url = SERVICE + "elastic/nested_facet/lading.soort/long/" + filter;
        }
        const response = await fetch(url);
        const json = await response.json();
        setData(json);
        setLoading(false);
    }

    function changeListLength() {
        if (more) {
            if (filter === "") {
                url = SERVICE + "elastic/nested_facet/lading.soort/short";
            } else {
                url = SERVICE + "elastic/nested_facet/lading.soort/short/" + filter;
            }
            setMore(false);
        } else {
            if (filter === "") {
                url = SERVICE + "elastic/nested_facet/lading.soort/long";
            } else {
                url = SERVICE + "elastic/nested_facet/lading.soort/long/" + filter;
            }
            setMore(true);
        }
    }


    function handleChange(e: React.FormEvent<HTMLInputElement>) {
        if (e.currentTarget.value.length > 1)
        {
            setFilter(e.currentTarget.value);
        }
    }

    useEffect(() => {
        fetchData();
    }, [filter, more]);

    return (
        <div className="hcFacet">
            <div className="hcFacetTitle">
                <span>{props.name}</span>
            </div>


            <div className="hcFacetFilter"><input type="text" name="" onChange={handleChange} id="shipMasterFilter" placeholder="Type to filter"/></div>
            {!loading ? (<div className="hcFacetItems">
                    {data.map((item, index) => {
                        return (
                            <div className="hcFacetItem" onClick={() => props.parentCallback({facet: "Commodity", field: "lading.soort", candidate: item.key})}>
                                {item.key}
                            </div>
                        )
                    })}


                    <div className="hcClickable" onClick={changeListLength}>
                        { more ? (<div>More...</div>) : (<div>Less...</div>)}

                    </div>
                </div>) :
                (<div className="hcFacetLoading">Loading...</div>)}
        </div>
    );
}

export default AutoCompleteFacet;
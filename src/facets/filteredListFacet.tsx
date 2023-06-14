import React from "react";
import {useState, useEffect} from "react";
import {SERVICE} from "../misc/config";
import {IFacetValue, ISendCandidate} from "../misc/interfaces";


function FilteredListFacet(props: {parentCallback: ISendCandidate, name: string, field: string}) {

    const [more, setMore] = useState(true);
    const [filter, setFilter] = useState("");
    const [data, setData] = useState<IFacetValue[]>([]);
    const [url, setUrl] = useState(SERVICE + "/filter-facet?name=" + props.field + "&amount=10&filter=" + filter);
    const [loading, setLoading] = useState(true);
    const [hidden, setHidden] = useState(true);


    async function fetchData() {
        setUrl(SERVICE + "/filter-facet?name=" + props.field + "&amount=10&filter=" + filter);
        const response = await fetch(url);
        const json = await response.json();
        setData(json);
        setLoading(false);
    }



    function handleChange(e: React.FormEvent<HTMLInputElement>) {
        if (e.currentTarget.value.length > 1)
        {
            setFilter(e.currentTarget.value);
        }
    }

    function sendCandidate(value: string) {
        props.parentCallback({facet: props.name, field: props.field, candidate: value});
    }

    useEffect(() => {
        fetchData();
    }, [filter]);

    return (
        <div className="hcFacet">
            <div className="hcFacetTitle">
                <span>Type</span>
            </div>

            <div className="hcFacetFilter"><input type="text" name="" onChange={handleChange} id="shipMasterFilter" placeholder="Type to filter"/></div>
            {!loading ? (<div className="hcFacetItems">
                    {data.map((item, index) => {
                        return (<div key={index} className="hcFacetItem"  onClick={() => {sendCandidate(item.key)}}><div className="checkBoxLabel"> {item.key} ({item.doc_count})</div></div>);
                    })}

                </div>) :
                (<div className="hcFacetLoading">Loading...</div>)}
        </div>
    );
}

export default FilteredListFacet;
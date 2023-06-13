import React from "react";
import {useState, useEffect} from "react";
import {SERVICE} from "../misc/config";
import {IFacetValue, ISendCandidate} from "../misc/interfaces";


function FilteredListFacet(props: {parentCallback: ISendCandidate}) {

    const [more, setMore] = useState(true);
    const [filter, setFilter] = useState("");
    const [data, setData] = useState<facetList>({"buckets": []});
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
                <span>Type</span>
                <span className="hcIconHelp" onClick={() => setHelp(!help)}><img
                    src="https://d33wubrfki0l68.cloudfront.net/85886ca3e2d8c36ba06d7773a094512272453181/545f8/images/icons/icon-huc-help.svg"
                    alt=""/></span>
            </div>
            { help &&
            <div className="hcFacetHelp">
                <strong>The full name facet </strong><br/>
                The names of the home ports are ordered by their number of passages.
            </div> }

            <div className="hcFacetFilter"><input type="text" name="" onChange={handleChange} id="shipMasterFilter" placeholder="Type to filter"/></div>
            {!loading ? (<div className="hcFacetItems">
                    {data.buckets.map((item) => {
                        return (
                            <div className="hcFacetItem" onClick={() => props.parentCallback({facet: "Commodity", field: "lading.soort", candidate: item.key})}>
                                {item.key}
                            </div>
                        )
                    })}

                </div>) :
                (<div className="hcFacetLoading">Loading...</div>)}
        </div>
    );
}

export default FilteredListFacet;
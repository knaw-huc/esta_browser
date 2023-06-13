import React from "react";
import {useParams, useNavigate} from "react-router-dom";
import {useState, useEffect} from "react";
import {
    ISendCandidate,
    IFacetCandidate,
    ISearchObject,
    ISearchValues,
    ISendPage,
    IResetFacets,
    IResultList,
    IRemoveFacet, ISetID, ISendRangeCandidate
} from "../misc/interfaces";
import {Base64} from "js-base64";
import FreeTextFacet from "../facets/freeTextFacet";
import ListFacet from "../facets/listFacet";
import SliderFacet from "../facets/sliderFacet";
import {SERVICE, HOME} from "../misc/config";
import VoyageList from "../elements/voyageList";
import SearchMap from "../elements/searchMap";
import {Fragment} from "react";


function Search() {
    const params = useParams();
    const parameters: ISearchObject = JSON.parse(Base64.decode(params.code as string));
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [refresh, setRefresh] = useState(true);
    const [result, setResult] = useState<IResultList>({amount: 0, pages: 0, items: []});
    const [numberOfItems, setNumberOfItems] = useState(0);
    const [showMap, setShowMap] = useState(true);
    const [currentID, setCurrentID] = useState(getVoyageID());
    let navigate = useNavigate();
    document.title = "Search | ESTA";

    let searchBuffer: ISearchObject = {
        searchvalues: parameters.searchvalues,
        page: page,
        page_length: 4000,
        sortorder: "year",
    };

    const [searchStruc, setSearchStruc] = useState(searchBuffer);
    const cross: string = "[x]";
    const setAnchor: ISetID = (id: string) => {
        setCurrentID(id);
        localStorage.setItem("voyage", id);
    }

    function getVoyageID(): string {
        let RetVal = "0"
        if (localStorage.getItem("voyage") !== null) {
            RetVal = localStorage.getItem("voyage") as string;
        }
        return RetVal
    }

    async function fetch_data() {
        const url = SERVICE + "/browse";
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Origin': HOME
            },
            body: JSON.stringify(parameters)
        });
        const json: IResultList = await response.json();
        setResult(json);
        setNumberOfItems(json.amount);
        setLoading(false);
    }

    const goToPage: ISendPage = (page: number) => {
        searchBuffer.page = page;
        setSearchStruc(searchBuffer);
        setRefresh(!refresh);
        navigate('/search/' + Base64.toBase64(JSON.stringify(parameters)));
        window.scroll(0, 0);
    }

    const removeFacet: IRemoveFacet = (field: string, value: string) => {
        searchBuffer = searchStruc;
        if (typeof searchBuffer.searchvalues === "object") {
            searchBuffer.searchvalues.forEach((item: ISearchValues) => {
                if (item.name === field) {
                    item.values = item.values.filter((element => element !== value));
                }
            })
            searchBuffer.searchvalues = searchBuffer.searchvalues.filter(function (el) {
                return el.values.length > 0
            });
            if (searchBuffer.searchvalues.length === 0) {
                searchBuffer.searchvalues = [];
            }
        }
        setSearchStruc(searchBuffer);
        setRefresh(!refresh);
        setAnchor("0");
        navigate('/search/' + Base64.toBase64(JSON.stringify(searchStruc)));
        window.scroll(0, 0);
    }

    const resetFacets: IResetFacets = () => {
        searchBuffer = searchStruc;
        searchBuffer.page = 1;
        searchBuffer.searchvalues = [];
        setSearchStruc(searchBuffer);
        navigate('/search/' + Base64.toBase64(JSON.stringify(searchStruc)));
        setAnchor("0");
        window.scroll(0, 0);
        setRefresh(!refresh);
    }


    const sendCandidate: ISendCandidate = function (candidate: IFacetCandidate, replace: boolean = false)  {
        setPage(1);
        setAnchor("0");
        if (parameters.searchvalues.length === 0) {
            parameters.searchvalues = [{
                name: candidate.facet,
                field: candidate.field,
                values: [candidate.candidate]
            } as ISearchValues];
            //parameters.page = 1;
            setSearchStruc(parameters);
            //navigate('/search/' + Base64.toBase64(JSON.stringify(parameters)));
        } else {
            if (typeof parameters.searchvalues === "object") {
                let found: boolean = false;
                parameters.searchvalues.forEach((item) => {
                    if (item.name === candidate.facet) {
                        found = true;
                        if (!item.values.includes(candidate.candidate)) {
                            if (replace) {
                                item.values = [candidate.candidate];
                            }
                            else {
                                item.values.push(candidate.candidate);
                            }

                        }
                    }
                });
                if (!found) {
                    parameters.searchvalues.push({
                        name: candidate.facet,
                        field: candidate.field,
                        values: [candidate.candidate]
                    });
                }
            }
            searchStruc.page = 1;
        }

        setCurrentID("");
        window.scroll(0, 0);
        goToPage(page);
        setRefresh(!refresh);
    }

    useEffect(() => {
        fetch_data();
    }, [refresh]);

    const anchor: string = "currentVoyage_" + currentID;


    return (
        <div className="hcContentContainer">
            <div className="hcBasicSideMargin hcMarginTop1 hcMarginBottom1">
                <h1>Search</h1>
            </div>
            <div className="hcLayoutFacet-Result hcBasicSideMargin hcMarginBottom15">
                <div className="hcLayoutFacets">
                    <FreeTextFacet add={sendCandidate}/>
                    <SliderFacet parentCallback={sendCandidate} name="Year" field="year" from={1620} to={1860}/>
                    <ListFacet parentCallback={sendCandidate} name="Place of departure" field="sub_voyage.sub_dept_location_standardized"/>
                    <ListFacet parentCallback={sendCandidate} name="Place of arrival" field="sub_voyage.sub_arrival_location_standardized"/>
                    <SliderFacet parentCallback={sendCandidate} name="Number of enslaved" field="sub_voyage.slaves_total" from={0} to={4000}/>
                </div>
                <div className="hcLayoutResults">
                    <div className="hcResultsHeader hcMarginBottom1">
                        <div>{numberOfItems} items found</div>
                    </div>
                    <div className="hcMarginBottom2">
                        <div className="hcSmallTxt hcTxtColorGreyMid">Selected facets:
                            <span className="hcFacetReset hcClickable" onClick={resetFacets}>Reset facets</span>
                            {showMap ? (
                                <span className="hcFacetReset hcClickable" onClick={() => {setShowMap(false)}}>Hide map</span>
                            ) : (
                                <span className="hcFacetReset hcClickable" onClick={() => {setShowMap(true)}}>Show map</span>
                            )}


                        </div>
                        {parameters.searchvalues.length === 0 ? (
                            <Fragment><span className="hcSelectedFacet"><span
                                className="hcSelectedFacetType">None</span></span></Fragment>
                        ) : (
                            parameters.searchvalues.map((item: ISearchValues) => {
                                return (
                                    <span className="hcSelectedFacet"><span
                                        className="hcSelectedFacetType">{item.name}: </span>
                                        {item.values.map(function (skipper, i) {
                                            return (<div className="hcFacetValues" key={i}
                                                         onClick={() => removeFacet(item.name, skipper)}>{skipper} {cross} </div>)
                                        })}
                                    </span>
                                )
                            })
                        )}
                    </div>
                    {showMap && (<SearchMap data={result}/>)}
                    {/*<div className="hcList">
                        <div className="hcListHeader">
                            <div className="hcLabel">Manuscripts</div>
                        </div>
                    </div>*/}
                    {loading ? (<div className="hcResultListLoading">Loading...</div>) : (
                        <VoyageList result={result} setAnchor={setAnchor} currentID={currentID}/>)}
                </div>
            </div>
        </div>
    )
}

export default Search;
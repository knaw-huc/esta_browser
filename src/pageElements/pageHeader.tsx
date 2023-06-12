import React from 'react';
import {useNavigate} from "react-router-dom";
import {ISearchObject} from "../misc/interfaces";
import {Base64} from "js-base64";


function PageHeader() {
    const navigate = useNavigate();

    function goSearch() {
        let searchStruc: ISearchObject = {
            searchvalues: [],
            page: 1,
            page_length: 4000,
            sortorder: "year"
        };
        const code: string = Base64.encode(JSON.stringify(searchStruc));
        localStorage.setItem("voyage", "0");
        navigate("search/" + code);
    }
    return (
        <div>
            <div className="hcContentContainer bgColorBrand1 hcMarginBottom1">
                <header className=" hcPageHeaderSimple hcBasicSideMargin">
                    <div className="hcBrand">
                        <div className="hcBrandLogo" onClick={() => {navigate("/")}}>
                            <div className="hcTitle">ESTA Voyages</div>
                        </div>
                    </div>

                    <nav>
                        <a onClick={() => goSearch()}>Browse</a>
                        <a onClick={() => {window.open("https://esta.sd.di.huc.knaw.nl/")}}>Login</a>
                    </nav>
                </header>
            </div>
            <div className="hcContentContainer hcMarginBottom5 hcBorderBottom">

            </div>
        </div>
    )
}

export default PageHeader;
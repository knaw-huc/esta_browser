export interface IFacetValue {
    key: string,
    doc_count: number
}

export interface ISearchValues {
    name: string,
    field: string,
    values: string[]
}

export interface ISearchObject {
    searchvalues: ISearchValues[],
    page: number,
    page_length: number,
    sortorder: string
}

export interface IFacetCandidate {
    facet: string,
    field: string,
    candidate: string
}

export interface ISendCandidate {
    (data: IFacetCandidate):void
}

export interface IFacetCandidate {
    facet: string,
    field: string,
    candidate: string
}

export interface IRemoveFacet {
    (field: string, value: string): void
}

export interface IResultItem {
    summary: string,
    year: string,
    voyage_id: string,
    sub_voyage: IresSubVoyage[]
}

export interface IresSubVoyage {
    sub_arrival_location: string,
    sub_dept_location: string
}

export interface ILocatie {
    locatie: string
}


export interface IOrganisatie {
    organisatie: string
}

export interface IRol {
    rol: string
}


export interface IResultList {
    amount: number,
    pages: number,
    items: IResultItem[]
}

export interface ISendPage {
    (data: number): void
}

export interface IResetFacets {
    (): void
}

export interface IVoyage {
    last_mutation: string,
    summary: string,
    year: string,
    subvoyages: ISubVoyage[]
}

export interface ICargo {
    cargo_commodity: string,
    cargo_unit: string,
    cargo_quantity: string,
    cargo_value: string,
    cargo_source: string
}

export interface ITransport {
    transport_name: string,
    transport_type: string,
    transport_capacity: string,
    transport_source: string
}

export interface ISubVoyage {
    subvoyage_id: string,
    subvoyage_type: string,
    sub_dept_location: string,
    sub_dept_location_status: string,
    sub_dept_date_as_source: string,
    sub_dept_date_status: string,
    sub_arrival_location: string,
    sub_arrival_location_status: string,
    sub_arrival_date_as_source: string,
    sub_arrival_date_status: string,
    sub_source: string,
    sub_vessel: string;
    sub_slaves: string,
    cargo: ICargo[],
    vessel: ITransport[]
    slaves: ISlaves
}

export interface ISlaves {
    slaves_id: string,
    slaves_total: string,
    slaves_total_status: string,
    slaves_mortality: string,
    slaves_type: string,
    slaves_notes: string,
    slaves_source: string,
    groups: ISlaveGroup[]
}

export interface ISlaveGroup {
    gr_sex: string,
    gr_age_group: string,
    gr_ethnicity: string,
    gr_physical_state: string,
    gr_quantity: string,
    gr_notes: string
}

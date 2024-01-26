export type DegreeDayData = {
    city: string
    id: number
    lat: number
    lon: number
    zip: string
    cooling: DegreeDayMonths
    heating: DegreeDayMonths
};

export type DegreeDayMonths = {
    jan: string;
    feb: string;
    mar: string;
    apr: string;
    may: string;
    jun: string;
    jul: string;
    aug: string;
    sep: string;
    oct: string;
    nov: string;
    dec: string;
};
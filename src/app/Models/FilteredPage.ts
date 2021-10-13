import { CarOffer } from "./CarOffer";

export interface FilteredPage {
    offers: Array<CarOffer>;
    size: number;
    pages: number;
}
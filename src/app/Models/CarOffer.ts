import { CarType } from "./CarType";
import { Image } from "./Image";
import { Mark } from "./Mark";
import { Model } from "./Model";
import { State } from "./State";

export interface FuelType {
    id: number;
    fuelTypeName: string;
}

export interface Gearbox {
    id: number;
    gearbox: string;
}

export interface Color {
    id: number;
    colorName: string;
}

export interface DrivingGear {
    id: number;
    drivingGear: string
}

export interface Car {
    id: number;
    mark: Mark;
    model: Model;
    fuelType: FuelType;
    power: number;
    engineCapacity: number;
    gearbox: Gearbox;
    color: Color;
    state: State;
    carType: CarType;
    mileage: number;
    drivingGear: DrivingGear;
    yearOfProduction: string;
}

export interface User {
    id: number;
}

export interface CarOffer {
    id: number;
    title: string;
    description: string;
    car: Car;
    user: User;
    price: number;
    city: string;
    images: Array<Image>;
    createdAt: string;
}




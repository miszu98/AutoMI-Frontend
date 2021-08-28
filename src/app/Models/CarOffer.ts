import { Mark } from "./Mark";
import { Model } from "./Model";

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
    mark: Mark;
    model: Model;
    fuelType: FuelType;
    power: number;
    engineCapacity: number;
    gearbox: Gearbox;
    color: Color;
    state: number;
    carType: number;
    mileage: number;
    drivingGear: DrivingGear;
    yearOfProduction: string;
}

export interface User {
    id: number;
}

export interface CarOffer {
    title: string;
    description: string;
    car: Car;
    user: User;
    price: number;
}




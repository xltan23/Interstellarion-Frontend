import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { environment } from "../environments/environment";
import { Apod, Planet, PlanetSearch } from "../models/planet";
import { environment_prod } from "../environments/environment.prod";

@Injectable({
    providedIn: 'root'
})
export class PlanetService {

    // private host:string = environment.apiUrl
    private host:string = environment_prod.apiUrl

    // CONSTRUCTOR
    constructor(private http:HttpClient) {}

    getApod(): Promise<Apod> {
        return firstValueFrom(this.http.get<Apod>(`${this.host}/planets/apod`))
    }

    getDefaultPlanets(): Promise<Planet[]> {
        return firstValueFrom(this.http.get<Planet[]>(`${this.host}/planets/default`))
    }

    getPlanetsByName(name:string): Promise<Planet[]> {
        return firstValueFrom(this.http.get<Planet[]>(`${this.host}/planets/${name}`))
    }

    postFilterGetPlanets(planetSearch:PlanetSearch): Promise<Planet[]> {
        return firstValueFrom(this.http.post<Planet[]>(`${this.host}/planets/filter`, planetSearch))
    }
}
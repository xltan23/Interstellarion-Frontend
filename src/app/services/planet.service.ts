import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { environment } from "../environments/environment";
import { Planet, PlanetSearch } from "../models/planet";

@Injectable({
    providedIn: 'root'
})
export class PlanetService {

    private host:string = environment.apiUrl

    // CONSTRUCTOR
    constructor(private http:HttpClient) {}

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
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

    getPlanets(): Promise<Planet[]> {
        return firstValueFrom(this.http.get<Planet[]>(`${this.host}/planets/all`))
    }

    getPlanet(planetSearch:PlanetSearch): Promise<Planet[]> {
        const planetName = planetSearch.name
        return firstValueFrom(this.http.get<Planet[]>(`${this.host}/planets/${planetName}`))
    }
}
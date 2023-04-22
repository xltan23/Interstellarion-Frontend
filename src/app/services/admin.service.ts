import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import { HttpClient } from "@angular/common/http";
import { CustomHttpResponse } from "../models/http-response";
import { BackgroundPost, PlanetUpdate } from "../models/planet";
import { firstValueFrom } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AdminService {

    private host:string = environment.apiUrl

    constructor(private http:HttpClient) {}

    updatePlanetImages(planetUpdate:PlanetUpdate): Promise<CustomHttpResponse> {
        const formData = new FormData()
        formData.set("name", planetUpdate.name)
        formData.set("thumbnail", planetUpdate.thumbnail)
        formData.set("cover", planetUpdate.cover)
        formData.set("description", planetUpdate.description)
        return firstValueFrom(this.http.put<CustomHttpResponse>(`${this.host}/planets/update`, formData))
    }

    addBackgroundImage(backgroundPost:BackgroundPost): Promise<CustomHttpResponse> {
        const formData = new FormData()
        formData.set("title", backgroundPost.title)
        formData.set("background", backgroundPost.background)
        return firstValueFrom(this.http.post<CustomHttpResponse>(`${this.host}/planets/background`, formData))
    }
}
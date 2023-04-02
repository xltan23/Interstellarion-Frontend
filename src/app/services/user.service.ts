import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { environment } from "../environments/environment";
import { Dreamer } from "../models/dreamer";
import { CustomHttpResponse } from "../models/http-response";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private host = environment.apiUrl

    // CONSTRUCTOR
    constructor(private http:HttpClient) {}

    editDreamer(dreamer:Dreamer): Promise<CustomHttpResponse> {
        return firstValueFrom(this.http.put<CustomHttpResponse>(`${this.host}/dreamer/edit`, dreamer))
    }

    changePassword(formData:FormData): Promise<CustomHttpResponse> {
        return firstValueFrom(this.http.put<CustomHttpResponse>(`${this.host}/dreamer/changePassword`, formData))
    }

    forgetPassword(dreamer:Dreamer): Promise<CustomHttpResponse> {
        return firstValueFrom(this.http.post<CustomHttpResponse>(`${this.host}/dreamer/forgetPassword`, dreamer))
    }

    deleteDreamer(dreamer:Dreamer): Promise<CustomHttpResponse> {
        return firstValueFrom(this.http.post<CustomHttpResponse>(`${this.host}/dreamer/delete`, dreamer))
    }
}
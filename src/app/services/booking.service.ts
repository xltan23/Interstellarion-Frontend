import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Booking } from "../models/booking";
import { firstValueFrom } from "rxjs";
import { CustomHttpResponse } from "../models/http-response";

@Injectable({
    providedIn: "root"
})
export class BookingService {

    private host:string = environment.apiUrl

    constructor(private http:HttpClient) {}

    saveTemporaryBooking(booking:Booking): Promise<CustomHttpResponse> {
        return firstValueFrom(this.http.post<CustomHttpResponse>(`${this.host}/travel/save`, booking))
    }

    getTemporaryBooking(dreamerId:string): Promise<Booking> {
        return firstValueFrom(this.http.get<Booking>(`${this.host}/travel/${dreamerId}`))
    }

}
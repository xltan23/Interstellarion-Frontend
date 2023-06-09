import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Booking, PaymentResponse } from "../models/booking";
import { firstValueFrom } from "rxjs";
import { CustomHttpResponse } from "../models/http-response";
import { environment_prod } from "../environments/environment.prod";

@Injectable({
    providedIn: "root"
})
export class BookingService {

    // private host:string = environment.apiUrl
    private host:string = environment_prod.apiUrl

    constructor(private http:HttpClient) {}

    saveTemporaryBooking(booking:Booking): Promise<CustomHttpResponse> {
        return firstValueFrom(this.http.post<CustomHttpResponse>(`${this.host}/travel/save`, booking))
    }

    getTemporaryBooking(dreamerId:string): Promise<Booking> {
        return firstValueFrom(this.http.get<Booking>(`${this.host}/travel/${dreamerId}`))
    }

    getBookings(dreamerId:string): Promise<Booking[]> {
        return firstValueFrom(this.http.get<Booking[]>(`${this.host}/travel/history/${dreamerId}`))
    } 

    checkoutBooking(booking:Booking): Promise<PaymentResponse> {
        console.log('Checking out Booking')
        return firstValueFrom(this.http.post<PaymentResponse>(`${this.host}/checkout/pay`, booking))
    }
}
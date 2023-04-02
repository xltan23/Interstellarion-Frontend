import { HttpClient, HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom, Observable, Subject } from "rxjs";
import { Dreamer } from "../models/dreamer";
import { JwtHelperService } from "@auth0/angular-jwt";
import { environment } from "../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    private host:string = environment.apiUrl

    private token!:string
    private loggedInUsername!:string
    private jwtHelper = new JwtHelperService()

    // CONSTRUCTOR
    constructor(private http:HttpClient) {}

    register(dreamer:Dreamer): Observable<Dreamer> {
        return this.http.post<Dreamer>(`${this.host}/dreamer/register`, dreamer)
    }

    login(dreamer:Dreamer): Observable<HttpResponse<Dreamer>> {
        // observe to get the HttpResponse
        return this.http.post<Dreamer>(`${this.host}/dreamer/login`, dreamer, {observe:'response'})
    }

    logOut(): void {
        this.token = ""
        this.loggedInUsername = ""
        localStorage.removeItem('dreamer')
        localStorage.removeItem('token')
        localStorage.removeItem('dreamers')
    }

    saveToken(token:string): void {
        this.token = token
        localStorage.setItem('token', token)
    }

    addDreamerToLocalCache(dreamer:Dreamer): void {
        // Simple storage only takes in string => Convert dreamer object to string
        localStorage.setItem('dreamer', JSON.stringify(dreamer))
    }

    getDreamerFromLocalCache(): Dreamer {
        return JSON.parse(localStorage.getItem('dreamer')!)
    }

    loadToken(): void {
        this.token = localStorage.getItem('token')!;
    }

    getToken(): string {
        return this.token
    }

    isLoggedIn(): boolean {
        this.loadToken()
        if (this.token != null && this.token != '') {
            // Subject is the username
            if (this.jwtHelper.decodeToken(this.token).sub != null || '') {
                // If token not expired
                if (!this.jwtHelper.isTokenExpired(this.token)) {
                    this.loggedInUsername = this.jwtHelper.decodeToken(this.token).sub
                    return true
                }
            }
        } else {
            this.logOut()
        }
        return false
    }
}
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, firstValueFrom } from "rxjs";
import { environment } from "../environments/environment";
import { DeleteAccount, Dreamer, PasswordReset } from "../models/dreamer";
import { CustomHttpResponse } from "../models/http-response";
import { environment_prod } from "../environments/environment.prod";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    // private host = environment.apiUrl
    private host:string = environment_prod.apiUrl

    // CONSTRUCTOR
    constructor(private http:HttpClient) {}

    getProfileImage(dreamer:Dreamer): Promise<any> {
        const dreamerId = dreamer.dreamerId
        console.log(dreamerId)
        return firstValueFrom(this.http.get(`${this.host}/dreamer/image/${dreamerId}`, {responseType: 'text'}))
    }

    editDreamer(dreamer:Dreamer): Promise<CustomHttpResponse> {
        const formData = new FormData()
        formData.set('email', dreamer.email)
        formData.set('firstName', dreamer.firstName)
        formData.set('lastName', dreamer.lastName)
        formData.set('profileImage',dreamer.profileImage)
        return firstValueFrom(this.http.put<CustomHttpResponse>(`${this.host}/dreamer/edit`, formData))
    }

    changePassword(passwordReset:PasswordReset): Promise<CustomHttpResponse> {
        const formData = new FormData()
        formData.set('email', passwordReset.email)
        formData.set('password', passwordReset.currentPassword)
        formData.set('newPassword', passwordReset.newPassword)
        return firstValueFrom(this.http.put<CustomHttpResponse>(`${this.host}/dreamer/changePassword`, formData))
    }

    forgetPassword(dreamer:Dreamer): Promise<CustomHttpResponse> {
        return firstValueFrom(this.http.post<CustomHttpResponse>(`${this.host}/dreamer/forgetPassword`, dreamer))
    }

    deleteDreamer(deleteAccount:DeleteAccount): Promise<CustomHttpResponse> {
        const formData = new FormData()
        formData.set('email', deleteAccount.email)
        formData.set('password', deleteAccount.password)
        return firstValueFrom(this.http.post<CustomHttpResponse>(`${this.host}/dreamer/delete`, formData))
    }
}
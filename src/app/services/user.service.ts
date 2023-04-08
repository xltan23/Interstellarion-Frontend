import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { environment } from "../environments/environment";
import { DeleteAccount, Dreamer, PasswordReset } from "../models/dreamer";
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
import { Injectable, signal } from "@angular/core";
import { LoginResponse } from "./types/user.interface";

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    currentUserSig = signal<LoginResponse | undefined | null>(null);
}

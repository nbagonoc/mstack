import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import "rxjs/add/operator/map";
import { tokenNotExpired } from "angular2-jwt";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http: HttpClient) {}

  // Signup
  registerUser(user) {
    let headers = new HttpHeaders();
    headers.append("Content-type", "applications/json");
    return this.http.post("users/register", user, {
      headers
    });
  }

  // Check user data
  authenticateUser(user) {
    let headers = new HttpHeaders();
    headers.append("Content-type", "applications/json");
    return this.http.post("users/authenticate", user, {
      headers
    });
  }

  getProfile() {
    this.loadToken();
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: this.authToken
    });
    return this.http.get("users/profile", {
      headers
    });
  }

  // store token and user data
  storeUserData(token, user) {
    localStorage.setItem("id_token", token);
    localStorage.setItem("user", JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken() {
    const token = localStorage.getItem("id_token");
    this.authToken = token;
  }

  isLoggedIn() {
    return tokenNotExpired("id_token");
  }

  // signout
  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}

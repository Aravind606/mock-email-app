import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor(private http: HttpClient, private router: Router) {

  }
  url = 'http://localhost:3000/api'

  verifyEmail(email) {
    return this.http.post(`${this.url}/user/login/email`, { "email": email })
  }
  verifyPassword(loginDetails) {
    return this.http.post(`${this.url}/user/login/password`, loginDetails)
  }
  registerUser(userDetails) {
    return this.http.post(`${this.url}/user/register`, userDetails)
  }

  isloggedIn() {
    let token = localStorage.getItem('token');
    return new JwtHelperService().isTokenExpired(token)
  }
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(["/"])
  }
  inboxMail(userId) {
    return this.http.get(`${this.url}/mail/inbox/${userId}`)
  }
  sentMail(userId) {
    return this.http.get(`${this.url}/mail/sent/${userId}`)
  }
  createMail(mailData) {
    return this.http.post(`${this.url}/mail`, mailData)
  }
  viewMail(id) {
    return this.http.get(`${this.url}/mail/view-mail/${id}`)
  }
  get currentUser() {
    let token = localStorage.getItem('token');
    return new JwtHelperService().decodeToken(token)
  }
}

import { MailService } from './../mail.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private service: MailService, private router: Router) { }
  enterEmail = true;
  enterPassword = false;
  invalidEmail = false;
  invalidPassword = false;
  userName;
  userEmail
  ngOnInit(): void {
  }
  verifyEmail(email) {
    this.service.verifyEmail(email).subscribe(user => {
      if (user['message'] == "invalid email") {
        this.invalidEmail = true
      }
      else {
        this.userName = user['name'];
        this.userEmail = user['email']
        this.enterEmail = false;
        this.enterPassword = true;
      }

    })
  }
  verifyPassword(password) {
    const user = {
      email: this.userEmail,
      password: password
    }
    this.service.verifyPassword(user).subscribe(user => {
      if (user['message'] == "invalid password") {
        this.invalidPassword = true
      }
      else {
        // console.log(user['token']);
        localStorage.setItem('token', user['token'])
        this.router.navigate(["/layout/mail"])
      }
    })
  }
}

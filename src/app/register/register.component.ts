import { MailService } from './../mail.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, Validator } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;
  invalidEmail = false
  constructor(private fb: FormBuilder, private service: MailService, private router: Router) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: '',
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })
  }

  ngOnInit(): void {
  }
  register() {
    const user = this.registerForm.value
    this.service.registerUser(user).subscribe(user => {
      if (user['message'] == "email already exist") {
        this.invalidEmail = true;
      }
      else {
        this.router.navigate(["/"])
      }
    })
  }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, Validator } from '@angular/forms';
import { Router } from '@angular/router';
import { MailService } from '../mail.service';
import { WebsocketService } from '../websocket.service';

@Component({
  selector: 'app-compose',
  templateUrl: './compose.component.html',
  styleUrls: ['./compose.component.css']
})
export class ComposeComponent implements OnInit {
  public mailForm: FormGroup;
  invalidEmail = false;
  mailSent = false;
  user
  constructor(private fb: FormBuilder, private service: MailService, private router: Router, private websocket: WebsocketService) {
    this.mailForm = this.fb.group({
      toAddress: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      details: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.user = this.service.currentUser;
  }
  mail() {
    const mail = {
      fromAddress: this.user.email,
      toAddress: this.mailForm.value.toAddress,
      subject: this.mailForm.value.subject,
      details: this.mailForm.value.details
    }
    this.websocket.emit('join', mail)
    this.service.createMail(mail).subscribe(mail => {
      if (mail['message'] == "invalid email address") {
        this.invalidEmail = true;
      }
      else {
        this.mailSent = true;
        this.router.navigate(['/layout/mail'])
      }
    })
  }
}

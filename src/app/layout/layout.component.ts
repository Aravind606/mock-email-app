import { MailService } from './../mail.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  currentUser;
  constructor(private service: MailService) { }

  ngOnInit(): void {
    this.currentUser = this.service.currentUser;
    console.log(this.currentUser);
  }
  logout() {
    this.service.logout();
  }
}

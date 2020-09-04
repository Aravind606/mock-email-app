import { MailService } from './../mail.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebsocketService } from '../websocket.service';

@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.css']
})
export class MailComponent implements OnInit {
  mail;
  userId;
  constructor(private service: MailService, private router: Router, private websocket: WebsocketService) { }

  ngOnInit(): void {
    const user = this.service.currentUser;
    this.userId = user.id;
    this.inboxItem()
    this.websocket.listen('messages').subscribe(data => {
      console.log(data);
    })
  }
  inboxItem() {
    this.service.inboxMail(this.userId).subscribe(data => {
      this.mail = data;
    })
  }
  viewMail(id) {
    this.router.navigate(['/layout/viewmail'], { queryParams: { mailId: id } });
  }
}

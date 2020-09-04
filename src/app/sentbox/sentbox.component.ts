import { Component, OnInit } from '@angular/core';
import { MailService } from '../mail.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sentbox',
  templateUrl: './sentbox.component.html',
  styleUrls: ['./sentbox.component.css']
})
export class SentboxComponent implements OnInit {
  mail;
  userId;
  constructor(private service: MailService, private router: Router) { }

  ngOnInit(): void {
    const user = this.service.currentUser;
    this.userId = user.id
    this.sentItem()
  }
  sentItem() {
    this.service.sentMail(this.userId).subscribe(data => {
      this.mail = data;
    })
  }
  viewMail(id) {
    this.router.navigate(['/layout/viewmail'], { queryParams: { mailId: id } });
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MailService } from '../mail.service';

@Component({
  selector: 'app-viewmail',
  templateUrl: './viewmail.component.html',
  styleUrls: ['./viewmail.component.css']
})
export class ViewmailComponent implements OnInit {
  mailId;
  viewData;
  constructor(private route: ActivatedRoute, private service: MailService) {
    this.mailId = this.route.snapshot.queryParamMap.get('mailId');
    this.service.viewMail(this.mailId).subscribe(mail => {
      this.viewData = mail;
    })
  }

  ngOnInit(): void {
  }

}

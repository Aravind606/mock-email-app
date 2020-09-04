import { WebsocketService } from './websocket.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'mockmail';

  constructor(private websocket: WebsocketService) { }

  ngOnInit(): void {

    // this.websocket.emit('join', 'sample sending data')
    // this.websocket.listen('messages').subscribe(data => {
    //   console.log(data)
    // })

  }
  // check() {
  //   this.websocket.emit('join', { "firstName": "aravind", "email": "ark@gmail.com" })
  // }

}

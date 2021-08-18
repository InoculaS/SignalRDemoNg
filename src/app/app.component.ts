import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignalrService } from './signalr.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(public signalrService: SignalrService,
    public http: HttpClient) {
  }
  ngOnInit(): void {
    this.http
      .get('http://localhost:63812/api/Admin/SaveUploads', {
        responseType: 'json',
      }).subscribe(data => {
        console.log(data);
      })
    console.log(
      this.signalrService.connection
    );
  }

  title = 'SignalRDemoNg';
  progressRate: number = 0;
}

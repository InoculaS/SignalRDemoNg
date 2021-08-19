import { environment } from './../environments/environment';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignalrService } from './signalr.service';
import { MessageService } from "primeng/api";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MessageService]
})
export class AppComponent implements OnInit {
  title = 'SignalRDemoNg';
  progressRate: number = 45;

  constructor(
    public signalrService: SignalrService,
    public http: HttpClient,
    private messageService: MessageService
  ) {
  }
  ngOnInit(): void {
    // this.http
    //   .post(environment.api_base_url + 'Admin/SaveUploads', {id: 1} ,{
    //     responseType: 'json',
    //   }).subscribe(data => {
    //     console.log(data);
    //   })

    // this.signalrService.open();
  }

  startToUpload() {
    this.progressRate == 0;
    this.http
      .post(environment.api_base_url + 'Admin/SaveUploads', { id: 1 }, {
        responseType: 'json',
      }).subscribe(data => {
        console.log(data);
      })

    this.signalrService.open()
      .then(() => {
        this.signalrService.UpdateProgressRate()
          .subscribe(data => {
            this.progressRate = data;
          })

      });
  }

}

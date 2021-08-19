import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  private connection: signalR.HubConnection;
  private progressRate = new BehaviorSubject<number>(0);

  constructor() {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:63812/hubs/notification') // the SignalR server url
      .build();
    this.registerOnServerEvents();
  }

  private registerOnServerEvents() {
    this.connection.on('updateArtice', (data: HubTranferObject) => {
      this.progressRate.next(<number>data.transferData);
    });
  }

  public open() {

    return new Promise((resolve, reject) => {
      if (this.connection.state === signalR.HubConnectionState.Connected) resolve(null);
      if (!this.connection)
        this.connection = new signalR.HubConnectionBuilder()
          .withUrl('http://localhost:63812/hubs/notification') // the SignalR server url
          .build();
      this.connection
        .start()
        .then((value) => {
          console.log(`SignalR connection success! connectionId: ${this.connection.connectionId} `);
          resolve(value);
        })
        .catch((error) => {
          console.log(`SignalR connection error: ${error}`);
          reject();
        });
    })
  }

  public UpdateProgressRate() {
    // this.connection
    //   .invoke('updateArtice')
    //   .catch(err => {
    //     console.error('SignalR updateArtice Method error:', err);
    //   })
    return this.progressRate;
  }
}

export class HubTranferObject {
  public transferData: any;
}

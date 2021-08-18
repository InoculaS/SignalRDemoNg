import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  connection: signalR.HubConnection;

  constructor() { }

  initiateSignalrConnection() {
      this.connection = new signalR.HubConnectionBuilder()
        .withUrl('http://localhost:63812/hubs/notification') // the SignalR server url
        .build();
  }

  public open() {
    return new Promise((resolve, reject) => {
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

  public close() {
    return new Promise((resolve, reject) => {
      this.connection
        .stop()
        .then((value) => {
          console.log(`SignalR connection close success! connectionId: ${this.connection.connectionId} `);
          resolve(value);
        })
        .catch((error) => {
          console.log(`SignalR connection close error: ${error}`);
          reject();
        });
    });
  }
}

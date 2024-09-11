import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private stompClient: Stomp.Client | null = null;
  public messageSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  private apiUrl = 'http://localhost:8082/api';

  constructor(private http: HttpClient, private userService: UserService) {}

  connect() {
    const socket = new SockJS('http://localhost:8082/ws');
    this.stompClient = Stomp.over(socket);
    
    this.stompClient.connect({}, (frame) => {
      console.log('Connected: ' + frame);
      this.stompClient?.subscribe('/msg/public', (message) => {
        this.messageSubject.next(JSON.parse(message.body));
      });
    }, (error) => {
      console.error('Error during connection: ', error);
    });
  }

  sendMessage(content: string) {
    const user = this.userService.getCurrentUser();

    if (!user) {
      console.error('No user found in UserService');
      return;
    }

    const chatMessage = {
      content: content,
      user: user,
      timestamp: new Date().toISOString()
    };

    if (this.stompClient?.connected) {
      this.stompClient.send('/chat/sendMessage', {}, JSON.stringify(chatMessage));
      console.log(chatMessage);
    } else {
      console.error('Stomp client is not connected');
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { WebSocketService } from '../../services/websocket.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat-room',
  standalone: true,
  imports: [FormsModule,HttpClientModule,CommonModule],
  templateUrl: './chat-room.component.html',
  styleUrl: './chat-room.component.scss'
})
export class ChatRoomComponent implements OnInit{
  messages: any[] = [];
  newMessage: string = '';

  constructor(private webSocketService: WebSocketService) {}

  ngOnInit() {
    // Connect to WebSocket server
    this.webSocketService.connect();

    // Subscribe to message updates
    this.webSocketService.messageSubject.subscribe(message => {
      if (message) {
        this.messages.push(message);
      }
    });
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      this.webSocketService.sendMessage(this.newMessage);
      this.newMessage = ''; // Clear the input after sending
    }
  }
  
}

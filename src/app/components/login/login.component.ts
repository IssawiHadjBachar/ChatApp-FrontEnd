import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private userService: UserService, private router: Router) {}

  login() {
    const user = { username: this.username, password: this.password };
    this.userService.login(user).subscribe(
      response => {
        alert('Login successful');
        this.userService.setCurrentUser(response); // Store user details in the service
        this.router.navigate(['/chat-room']);
      },
      error => {
        alert('Login failed');
      }
    );
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-resgister',
  standalone: true,
  imports: [FormsModule,HttpClientModule,CommonModule],
  templateUrl: './resgister.component.html',
  styleUrl: './resgister.component.scss'
})
export class ResgisterComponent {
  username: string = '';
  password: string = '';

  constructor(private userService: UserService, private router: Router) {}

  register() {
    const user = { username: this.username, password: this.password };
    this.userService.register(user).subscribe(
      response => {
        alert('Registration successful');
        this.router.navigate(['/login']);  // Navigate to login after successful registration
      },
      error => {
        alert('Registration failed');
      }
    );
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

}

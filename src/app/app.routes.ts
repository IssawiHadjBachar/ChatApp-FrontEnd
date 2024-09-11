import { Routes } from '@angular/router';
import { ResgisterComponent } from './components/resgister/resgister.component';
import { LoginComponent } from './components/login/login.component';
import { ChatRoomComponent } from './components/chat-room/chat-room.component';


export const routes: Routes = [
    { path: 'register', component: ResgisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'chat-room', component: ChatRoomComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' }
];

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isUserAuthenticated: boolean = false;
  private userSubscription: Subscription;
  currentUserEmail: string = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.userSubscription = this.authService.user.subscribe((user) => {
      this.isUserAuthenticated = user ? true : false;
      this.currentUserEmail = user.email;
    });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
    this.currentUserEmail = null;
  }
}

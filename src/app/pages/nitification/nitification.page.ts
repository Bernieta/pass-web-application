import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { Subscription } from 'rxjs';
import { User } from '../../interfaces/users';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nitification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nitification.page.html',
  styleUrl: './nitification.page.css',
})
export class NitificationPage implements OnInit, OnDestroy {
  subsUsers: Subscription;
  subsUserCall: Subscription;
  users: User[];
  userCall: string;

  constructor(private readonly notificationService: NotificationService) {}

  ngOnInit(): void {
    this.getUsers();
    this.getUserCall();
  }

  ngOnDestroy(): void {
    this.subsUsers.unsubscribe();
  }

  public registerUser(inputElement: HTMLInputElement) {
    this.notificationService.registerUser(inputElement.value);
    inputElement.value = '';
  }

  public getUsers() {
    this.subsUsers = this.notificationService.getUsers().subscribe((values) => {
      this.users = values;
    });
  }

  public getUserCall() {
    this.subsUserCall = this.notificationService
      .getUserCall()
      .subscribe((value) => {
        this.userCall = value;
      });
  }

  public selectedUserCall(username: string) {
    this.notificationService.registerUserCall(username);
  }

  public deleteUser(key: string) {
    this.notificationService.deleteUser(key);
    const user = this.users.find((user) => user.key === key);
    if (!user) {
      this.userCall = '';
      this.notificationService.registerUserCall(this.userCall);
    }
  }
}

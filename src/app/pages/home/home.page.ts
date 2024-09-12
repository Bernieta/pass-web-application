import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { HomeService } from '../../services/home.service';
import { Subscription, take } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.page.html',
  styleUrl: './home.page.css',
})
export class HomePage implements AfterViewInit, OnDestroy {
  @ViewChild('buttonPower') buttonPower: ElementRef<HTMLButtonElement>;
  subs: Subscription;
  alertActive: boolean = false;
  startDateTime: string = '';
  endDateTime: string = '';

  constructor(private readonly homeService: HomeService) {}

  ngAfterViewInit(): void {
    this.updateButtonColor();
    this.getActiveDateTime();
    this.getDesactiveDateTime();
  }

  ngOnDestroy(): void {
    if (this.subs) this.subs.unsubscribe();
  }

  public power() {
    this.homeService
      .readPowerApp()
      .pipe(take(1))
      .subscribe((value) => {
        if (value === 0) {
          this.homeService.powerApp(1);
        } else if (value === 1) {
          this.homeService.powerApp(0);
        }
        this.updateButtonColor();
      });
  }

  private updateButtonColor(): void {
    this.subs = this.homeService.readPowerApp().subscribe((value) => {
      if (value === 0) {
        this.buttonPower.nativeElement.style.backgroundColor = '#d20d0d';
      } else if (value === 1) {
        this.buttonPower.nativeElement.style.backgroundColor = '#0dd267';
      }
    });
  }

  public activeAndDesactiveDateTime(
    inputElementStart: HTMLInputElement,
    inputElementEnd: HTMLInputElement
  ) {
    const datetime1 = new Date(inputElementStart.value).getTime();
    const datetime2 = new Date(inputElementEnd.value).getTime();
    if (datetime1 >= datetime2) {
      this.alertActive = true;
      return;
    }

    this.homeService.activeAndDesactiveDateTime(
      inputElementStart.value,
      inputElementEnd.value
    );
    this.alertActive = false;
  }

  public getActiveDateTime() {
    this.homeService
      .getActiveDateTime()
      .subscribe((value) => (this.startDateTime = value));
  }

  public getDesactiveDateTime() {
    this.homeService
      .getDesactiveDateTime()
      .subscribe((value) => (this.endDateTime = value));
  }
}

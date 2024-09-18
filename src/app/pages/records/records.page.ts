import { Component, OnInit } from '@angular/core';
import { RecordService } from '../../services/record.service';
import { Record } from '../../interfaces/records';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-records',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './records.page.html',
  styleUrl: './records.page.css',
})
export class RecordsPage implements OnInit {
  records: Record[];
  inputDateDefaultValue: string;
  inputDateValue: string = '';
  textActivationQuantities: string = '';

  constructor(private readonly recordService: RecordService) {}

  ngOnInit(): void {
    this.getRecords();
    this.inputDateDefaultValue = this.toDateZeroHours(new Date()).split("T")[0];
  }

  public applyFilter(inputElementFilter: HTMLInputElement) {
    this.inputDateValue = inputElementFilter.value;
    this.getRecords();
  }

  public getRecords() {
    this.recordService.getRecords().subscribe((values) => {
      const currentDate = new Date();
      if (!this.inputDateValue) {
        this.records = this.filter(values, currentDate);
        this.textActivationQuantities = `La alarma se ha activado ${this.records.length} veces hoy`;
      }
      else {
        this.records = this.filter(
          values,
          new Date(`${this.inputDateValue}T00:00:00`)
        );
        this.textActivationQuantities = `La alarma se activó ${this.records.length} veces`;
      }
    });
  }

  public filter(array: Record[], date: Date) {
    return array.filter(
      (a) =>
        new Date(this.toDateZeroHours(new Date(a.date))).getTime() ===
        new Date(this.toDateZeroHours(date)).getTime()
    );
  }

  public toDateZeroHours(date: Date) {
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}T00:00:00`;
  }
}

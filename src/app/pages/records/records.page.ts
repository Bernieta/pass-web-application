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

  constructor(private readonly recordService: RecordService) {}

  ngOnInit(): void {
    this.getRecords();
  }

  public getRecords() {
    this.recordService.getRecords().subscribe((values) => {
      this.records = values;
    });
  }
}

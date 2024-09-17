import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordsPage } from './records.page';

describe('RecordsComponent', () => {
  let component: RecordsPage;
  let fixture: ComponentFixture<RecordsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecordsPage]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecordsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

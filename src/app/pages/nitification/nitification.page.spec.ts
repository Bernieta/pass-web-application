import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NitificationPage } from './nitification.page';

describe('NitificationComponent', () => {
  let component: NitificationPage;
  let fixture: ComponentFixture<NitificationPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NitificationPage]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NitificationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

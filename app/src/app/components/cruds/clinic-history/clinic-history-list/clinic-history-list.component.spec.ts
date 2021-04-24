import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicHistoryListComponent } from './clinic-history-list.component';

describe('ClinicHistoryListComponent', () => {
  let component: ClinicHistoryListComponent;
  let fixture: ComponentFixture<ClinicHistoryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClinicHistoryListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicHistoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicHistoryInfoComponent } from './clinic-history-info.component';

describe('ClinicHistoryInfoComponent', () => {
  let component: ClinicHistoryInfoComponent;
  let fixture: ComponentFixture<ClinicHistoryInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClinicHistoryInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicHistoryInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

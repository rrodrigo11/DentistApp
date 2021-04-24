import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OdontogramInfoComponent } from './odontogram-info.component';

describe('OdontogramInfoComponent', () => {
  let component: OdontogramInfoComponent;
  let fixture: ComponentFixture<OdontogramInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OdontogramInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OdontogramInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

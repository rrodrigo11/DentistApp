import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OdontogramListComponent } from './odontogram-list.component';

describe('OdontogramListComponent', () => {
  let component: OdontogramListComponent;
  let fixture: ComponentFixture<OdontogramListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OdontogramListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OdontogramListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfEmpanlementComponent } from './self-empanlement.component';

describe('SelfEmpanlementComponent', () => {
  let component: SelfEmpanlementComponent;
  let fixture: ComponentFixture<SelfEmpanlementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelfEmpanlementComponent]
    });
    fixture = TestBed.createComponent(SelfEmpanlementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

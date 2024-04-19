import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DcVerifyComponent } from './dc-verify.component';

describe('DcVerifyComponent', () => {
  let component: DcVerifyComponent;
  let fixture: ComponentFixture<DcVerifyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DcVerifyComponent]
    });
    fixture = TestBed.createComponent(DcVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

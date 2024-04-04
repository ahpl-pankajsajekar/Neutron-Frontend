import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DcDetailsComponent } from './dc-details.component';

describe('DcDetailsComponent', () => {
  let component: DcDetailsComponent;
  let fixture: ComponentFixture<DcDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DcDetailsComponent]
    });
    fixture = TestBed.createComponent(DcDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

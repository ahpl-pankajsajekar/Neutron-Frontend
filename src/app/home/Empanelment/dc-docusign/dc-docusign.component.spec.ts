import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DcDocusignComponent } from './dc-docusign.component';

describe('DcDocusignComponent', () => {
  let component: DcDocusignComponent;
  let fixture: ComponentFixture<DcDocusignComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DcDocusignComponent]
    });
    fixture = TestBed.createComponent(DcDocusignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

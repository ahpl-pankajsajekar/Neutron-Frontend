import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestpageOperationComponent } from './requestpage-operation.component';

describe('RequestpageOperationComponent', () => {
  let component: RequestpageOperationComponent;
  let fixture: ComponentFixture<RequestpageOperationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RequestpageOperationComponent]
    });
    fixture = TestBed.createComponent(RequestpageOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

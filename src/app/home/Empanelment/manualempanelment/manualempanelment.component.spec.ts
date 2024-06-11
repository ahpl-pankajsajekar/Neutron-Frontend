import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualempanelmentComponent } from './manualempanelment.component';

describe('ManualempanelmentComponent', () => {
  let component: ManualempanelmentComponent;
  let fixture: ComponentFixture<ManualempanelmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManualempanelmentComponent]
    });
    fixture = TestBed.createComponent(ManualempanelmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

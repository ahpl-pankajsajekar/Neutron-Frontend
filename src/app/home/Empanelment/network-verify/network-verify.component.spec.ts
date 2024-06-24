import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkVerifyComponent } from './network-verify.component';

describe('NetworkVerifyComponent', () => {
  let component: NetworkVerifyComponent;
  let fixture: ComponentFixture<NetworkVerifyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NetworkVerifyComponent]
    });
    fixture = TestBed.createComponent(NetworkVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

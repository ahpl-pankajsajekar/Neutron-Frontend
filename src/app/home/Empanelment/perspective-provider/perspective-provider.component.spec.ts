import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerspectiveProviderComponent } from './perspective-provider.component';

describe('PerspectiveProviderComponent', () => {
  let component: PerspectiveProviderComponent;
  let fixture: ComponentFixture<PerspectiveProviderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PerspectiveProviderComponent]
    });
    fixture = TestBed.createComponent(PerspectiveProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

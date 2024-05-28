import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFacilitieComponent } from './view-facilitie.component';

describe('ViewFacilitieComponent', () => {
  let component: ViewFacilitieComponent;
  let fixture: ComponentFixture<ViewFacilitieComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewFacilitieComponent]
    });
    fixture = TestBed.createComponent(ViewFacilitieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

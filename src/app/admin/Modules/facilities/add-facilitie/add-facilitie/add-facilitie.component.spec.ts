import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFacilitieComponent } from './add-facilitie.component';

describe('AddFacilitieComponent', () => {
  let component: AddFacilitieComponent;
  let fixture: ComponentFixture<AddFacilitieComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddFacilitieComponent]
    });
    fixture = TestBed.createComponent(AddFacilitieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

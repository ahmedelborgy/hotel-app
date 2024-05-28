import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditRoomsComponent } from './add-edit-rooms.component';

describe('AddEditRoomsComponent', () => {
  let component: AddEditRoomsComponent;
  let fixture: ComponentFixture<AddEditRoomsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditRoomsComponent]
    });
    fixture = TestBed.createComponent(AddEditRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAdsComponent } from './delete-ads.component';

describe('DeleteAdsComponent', () => {
  let component: DeleteAdsComponent;
  let fixture: ComponentFixture<DeleteAdsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteAdsComponent]
    });
    fixture = TestBed.createComponent(DeleteAdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

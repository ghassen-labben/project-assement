import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestRatingsComponent } from './latest-ratings.component';

describe('LatestRatingsComponent', () => {
  let component: LatestRatingsComponent;
  let fixture: ComponentFixture<LatestRatingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LatestRatingsComponent]
    });
    fixture = TestBed.createComponent(LatestRatingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonSearcherComponent } from './skeleton-searcher.component';

describe('SkeletonSearcherComponent', () => {
  let component: SkeletonSearcherComponent;
  let fixture: ComponentFixture<SkeletonSearcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkeletonSearcherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkeletonSearcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

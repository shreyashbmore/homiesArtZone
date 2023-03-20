import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaintingDetailComponent } from './painting-detail.component';

describe('PaintingDetailComponent', () => {
  let component: PaintingDetailComponent;
  let fixture: ComponentFixture<PaintingDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaintingDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaintingDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

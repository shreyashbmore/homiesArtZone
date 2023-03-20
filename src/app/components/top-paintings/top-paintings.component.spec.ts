import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from '../header/header.component';

import { TopPaintingsComponent } from './top-paintings.component';

describe('TopPaintingsComponent', () => {
  let component: TopPaintingsComponent;
  let fixture: ComponentFixture<TopPaintingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopPaintingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopPaintingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

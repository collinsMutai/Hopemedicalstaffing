import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Imageslider } from './imageslider';

describe('Imageslider', () => {
  let component: Imageslider;
  let fixture: ComponentFixture<Imageslider>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Imageslider]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Imageslider);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

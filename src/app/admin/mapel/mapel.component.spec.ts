import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapelComponent } from './mapel.component';

describe('MapelComponent', () => {
  let component: MapelComponent;
  let fixture: ComponentFixture<MapelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

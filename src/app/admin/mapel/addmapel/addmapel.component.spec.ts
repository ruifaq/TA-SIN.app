import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddmapelComponent } from './addmapel.component';

describe('AddmapelComponent', () => {
  let component: AddmapelComponent;
  let fixture: ComponentFixture<AddmapelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddmapelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddmapelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

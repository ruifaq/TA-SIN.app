import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnilaiComponent } from './addnilai.component';

describe('AddnilaiComponent', () => {
  let component: AddnilaiComponent;
  let fixture: ComponentFixture<AddnilaiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddnilaiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddnilaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddtemaComponent } from './addtema.component';

describe('AddtemaComponent', () => {
  let component: AddtemaComponent;
  let fixture: ComponentFixture<AddtemaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddtemaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddtemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

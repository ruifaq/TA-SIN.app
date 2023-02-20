import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddkelasComponent } from './addkelas.component';

describe('AddkelasComponent', () => {
  let component: AddkelasComponent;
  let fixture: ComponentFixture<AddkelasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddkelasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddkelasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

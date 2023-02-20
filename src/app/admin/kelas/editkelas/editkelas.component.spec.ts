import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditkelasComponent } from './editkelas.component';

describe('EditkelasComponent', () => {
  let component: EditkelasComponent;
  let fixture: ComponentFixture<EditkelasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditkelasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditkelasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

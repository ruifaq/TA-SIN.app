import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditnilaiComponent } from './editnilai.component';

describe('EditnilaiComponent', () => {
  let component: EditnilaiComponent;
  let fixture: ComponentFixture<EditnilaiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditnilaiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditnilaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

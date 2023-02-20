import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletekelasComponent } from './deletekelas.component';

describe('DeletekelasComponent', () => {
  let component: DeletekelasComponent;
  let fixture: ComponentFixture<DeletekelasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletekelasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletekelasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

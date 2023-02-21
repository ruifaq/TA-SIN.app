import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletetemaComponent } from './deletetema.component';

describe('DeletetemaComponent', () => {
  let component: DeletetemaComponent;
  let fixture: ComponentFixture<DeletetemaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletetemaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletetemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

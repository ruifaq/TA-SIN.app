import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdittemaComponent } from './edittema.component';

describe('EdittemaComponent', () => {
  let component: EdittemaComponent;
  let fixture: ComponentFixture<EdittemaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdittemaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EdittemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

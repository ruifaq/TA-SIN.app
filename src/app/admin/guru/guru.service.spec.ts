import { TestBed } from '@angular/core/testing';

import { GuruService } from './guru.service';

describe('GuruService', () => {
  let service: GuruService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuruService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

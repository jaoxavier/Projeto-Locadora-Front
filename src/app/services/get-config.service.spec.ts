import { TestBed } from '@angular/core/testing';

import { GetConfigService } from './get-config.service';

describe('GetConfigService', () => {
  let service: GetConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

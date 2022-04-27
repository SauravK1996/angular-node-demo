import { TestBed } from '@angular/core/testing';

import { ArchvieServicesService } from './archvie-services.service';

describe('ArchvieServicesService', () => {
  let service: ArchvieServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArchvieServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

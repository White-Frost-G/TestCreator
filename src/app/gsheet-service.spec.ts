import { TestBed } from '@angular/core/testing';

import { GSheetService } from './gsheet-service';

describe('GSheetService', () => {
  let service: GSheetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GSheetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

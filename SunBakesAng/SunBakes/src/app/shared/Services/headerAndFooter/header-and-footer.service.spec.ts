import { TestBed } from '@angular/core/testing';

import { HeaderAndFooterService } from './header-and-footer.service';

describe('HeaderAndFooterService', () => {
  let service: HeaderAndFooterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeaderAndFooterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { RegisterLoginLogoutService } from './register-login-logout.service';

describe('RegisterLoginLogoutService', () => {
  let service: RegisterLoginLogoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisterLoginLogoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

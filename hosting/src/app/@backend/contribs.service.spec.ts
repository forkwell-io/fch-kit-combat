import { TestBed } from '@angular/core/testing';

import { ContribsService } from './contribs.service';

describe('ContribsService', () => {
  let service: ContribsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContribsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('contributeToRequest', async () => {
    const requestId = '6xy134uFCocoHmU5DYJh';
    await service.contributeToRequest(requestId, {
      remarks: 'Heya',
      sender: {
        name: 'Danish',
        email: 'mdanish1908@gmail.com',
        phone: '-'
      },
      contributionItems: [
        {name: 'Blanket', qty:90}
      ]
    });
    expect().nothing();
  });
});

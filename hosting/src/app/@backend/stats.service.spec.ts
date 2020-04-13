import { TestBed } from '@angular/core/testing';

import { StatsService } from './stats.service';
import {GoogleChartsModule} from 'angular-google-charts';

describe('StatsService', () => {
  let service: StatsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        GoogleChartsModule
      ]
    });
    service = TestBed.inject(StatsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('itemsSnapshot', () => {
    service.requestItemsSnapshot.subscribe(value => {
      console.info(value);
    });
    expect().nothing();
  });

  it('getAgenciesNeedItem', async () => {
    const agencies = await service.getAgenciesNeedItem('Blanket');
    console.info(agencies);
    expect().nothing();
  });

  it('mostWantedItems', async() => {
    const items = await service.mostWantedItems();
    console.info(items);
    expect().nothing();
  });
});

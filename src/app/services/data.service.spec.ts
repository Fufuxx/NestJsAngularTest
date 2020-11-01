import { HttpClientModule } from '@angular/common/http';
import { getTestBed, TestBed } from '@angular/core/testing';
import { generateAccounts } from '../../../shared/models/account';
import { DataService } from './data.service';

describe('Angular - DataService', () => {
  let injector: TestBed;
  let dataService: DataService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      // Provide both the service-to-test and its (spy) dependency
      imports: [
        HttpClientModule
      ],
      providers: [
        DataService
      ]
    });
    // Inject both the service-to-test and its (spy) dependency
    injector = getTestBed();
    dataService = injector.inject(DataService);
  });

  it('should trigger a transaction', () => {
    let accounts = generateAccounts(5);
    const tx = accounts
      .map(acc => acc.transactions.length)
      .reduce((accumulator, current) => accumulator + current, 0);
    // -> Generate
    let result = dataService.triggerTransaction(accounts);
    const tx_after = result
      .map(acc => acc.transactions.length)
      .reduce((accumulator, current) => accumulator + current, 0);

    // Should return array of 5 accounts
    expect(result.length).toBe(5);
    // Should have 1 additional Transaction
    expect(tx_after).toBe(tx + 1); 
  });

});
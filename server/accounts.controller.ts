
import { Controller, Get } from '@nestjs/common';

import { Account } from '../shared/models/account';

@Controller()
export class AccountController {
  @Get('accounts')
  findAll(): Account[] {
    return [
      {
        name: 'Account 1',
        category: 'Affiliate',
        tags: ['test'],
        balance: 33.3456454,
        availableBalance: 23.435363
      },
      {
        name: 'Account 2',
        category: 'Affiliate',
        tags: ['test'],
        balance: 0,
        availableBalance: 0
      },
      {
        name: 'Account 3',
        category: 'Credit Player',
        tags: ['test'],
        balance: 12.32424252,
        availableBalance: 12.32424252
      }
    ];
  }
}
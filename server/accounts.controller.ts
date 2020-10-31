
import { Controller, Get } from '@nestjs/common';

import { Account, generateAccounts } from '../shared/models/account';

@Controller()
export class AccountController {
  @Get('accounts')
  findAll(): Account[] {
    return generateAccounts(15)
  }
}
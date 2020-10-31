import { AccountController } from './accounts.controller';

describe('NestJS - AccountsController', () => {
  let catsController: AccountController;

  beforeEach(() => {
    catsController = new AccountController();
  });

  describe('findAll', () => {
    it('should return an array of 15 accounts', async () => {
      expect(await catsController.findAll().length).toBe(15);
    });
  });
});
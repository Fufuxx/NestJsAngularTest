export class Transaction {
  date: string;
  id: string;
  type: string = 'Payment received';
  debit: number = 0;
  credit: number = 0;
  balance: number = 0;

  constructor(id: string, balance: number) {
    let amount = Number((Math.random() * 2).toFixed(8));
    // 50% positive or negative
    amount *= Math.round(Math.random()) ? 1 : -1;
    this.id= id;
    this.date = (new Date()).toLocaleDateString('en-US');
    if(amount < 0) {
      // -> If balance goes to negative, credit instead (for test purpose no negative balance)
      if(balance + amount < 0) {
        this.credit = -1 * amount;
      }
      else {
        this.debit = -1 * amount;
        this.type = 'Payment made';
      }
    }
    else {
      this.credit = amount;
    }
    this.balance = Number((balance - this.debit + this.credit).toFixed(8));
  }
  
}
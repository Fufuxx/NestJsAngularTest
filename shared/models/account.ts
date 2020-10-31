import { Transaction } from './transaction';

export interface IAccount {
  slug: string;
  name: string;
  category: string;
  tags: string[];
  balance: number;
  availableBalance: number;
  transactions: Transaction[];
  setTransactions(transactions: Transaction[]): void;
  setBalance(balance: number): void;
}

export class Account implements IAccount {
  slug!: string;
  name!: string;
  category!: string;
  tags: string[] = ['Test'];
  balance: number = 0;
  availableBalance: number = 0;
  transactions: Transaction[] = [];

  constructor(name: string) {
    this.slug = stringtoSlug(name);
    this.name = name;
    // Random category
    const CATEGORIES = ['Affiliate', 'Partner', 'Premium', 'Basic'];
    const randCat = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
    this.category = randCat;
  }

  setTransactions(transactions: Transaction[]) {
    this.transactions = transactions;
  }

  setBalance(balance: number) {
    this.balance = balance;
    this.availableBalance = balance;
  }
}

// -> Util convert name to slug
function stringtoSlug (str) {
  str = str.replace(/^\s+|\s+$/g, '');
  str = str.toLowerCase();
  var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
  var to   = "aaaaeeeeiiiioooouuuunc------";
  for (var i=0, l=from.length ; i<l ; i++) {
      str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }
  str = str.replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  return str;
}

// Util -> Helper generate random accounts
export function generateAccounts(number: number) {
  let accounts: Account[] = [];
  for(let i=0; i<number; i++) {
    const transactionData = generateTransactions(15);
    let account = new Account('Account ' + i);
    account.setTransactions(transactionData);
    account.setBalance(transactionData.slice(-1).pop().balance);
    accounts.push(account);
  }
  return accounts;
}

// Util -> Helper generate random transactions
export function generateTransactions(number: number) {
  let transactions: Transaction[] = [];
  let balance = 0;
  for(let i=0; i<number; i++) {
    const transaction = new Transaction('' + i, balance);
    transactions.push(transaction);
    balance = transaction.balance;
  }
  return transactions;
}
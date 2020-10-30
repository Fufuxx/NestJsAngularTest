export class Account {
  id!: string;
  name!: string;
  category!: string;
  tags: string[] = [];
  balance!: number;
  availableBalance!: number;
}

export function generateAccounts(number: number) {
  const CATEGORIES = ['Affiliate', 'Partner', 'Premium', 'Basic'];
  const TAGS = ['tag1', 'tag2', 'tag3'];
  let accounts: Account[] = [];
  for( let i=0; i<=number; i++ ) {
    const BALANCE = Number((Math.random() * 20).toFixed(8));
    accounts.push({
      id: '' + i,
      name: `Account ${i}`,
      category: CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)],
      tags: [TAGS[Math.floor(Math.random() * TAGS.length)]],
      balance: BALANCE,
      availableBalance: Number( (BALANCE - BALANCE/5).toFixed(8) )
    });
  }
  return accounts;
}
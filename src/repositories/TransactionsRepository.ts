import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransaction {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const totalBalance = this.transactions.reduce(
      (balanceCalc, transaction) => {
        const balance = balanceCalc;

        if (transaction.type === 'income') {
          balance.income += transaction.value;
        } else {
          balance.outcome += transaction.value;
        }

        balance.total = balance.income - balance.outcome;

        return balance;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );

    return totalBalance;
  }

  public create({ title, value, type }: CreateTransaction): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;

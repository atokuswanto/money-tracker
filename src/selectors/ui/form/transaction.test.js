import format from 'date-fns/format'
import { getDefaultState } from './transaction'
import Transaction, { EXPENSE, INCOME } from '../../../entities/Transaction'
import EntityMap from '../../../entities/EntityMap'

it('returns default state for single account, single currency', () => {
  const state = {
    entities: {
      accounts: EntityMap.fromArray([
        {
          id: 'A12345',
          name: 'foo',
          balance: { USD: 199 },
          currencies: ['USD']
        }
      ])
    },
    settings: {
      currency: {
        base: 'USD'
      }
    }
  }
  const expectedDefault = {
    kind: Transaction.defaultKind,
    isModalOpen: false,
    accountId: 'A12345',
    amount: '',
    currency: 'USD',
    linkedAccountId: null,
    linkedAmount: '',
    linkedCurrency: null,
    tags: {
      [EXPENSE]: [],
      [INCOME]: []
    },
    date: format(new Date(), 'YYYY-MM-DD'),
    note: ''
  }

  expect(getDefaultState(state)).toEqual(expectedDefault)
})

it('returns default state for single account, multiple currencies', () => {
  const state = {
    entities: {
      accounts: EntityMap.fromArray([
        {
          id: 'A12345',
          name: 'foo',
          balance: { USD: 199, JPY: 2000 },
          currencies: ['USD', 'JPY']
        }
      ])
    },
    settings: {
      currency: {
        base: 'USD'
      }
    }
  }
  const expectedDefault = {
    kind: Transaction.defaultKind,
    isModalOpen: false,
    accountId: 'A12345',
    amount: '',
    currency: 'USD',
    linkedAccountId: 'A12345',
    linkedAmount: '',
    linkedCurrency: 'JPY',
    tags: {
      [EXPENSE]: [],
      [INCOME]: []
    },
    date: format(new Date(), 'YYYY-MM-DD'),
    note: ''
  }

  expect(getDefaultState(state)).toEqual(expectedDefault)
})

it('returns default state for multiple accounts', () => {
  const state = {
    entities: {
      accounts: EntityMap.fromArray([
        {
          id: 'A12345',
          name: 'foo',
          balance: { USD: 199, JPY: 2000 },
          currencies: ['USD', 'JPY']
        },
        {
          id: 'A12346',
          name: 'bar',
          balance: { EUR: 100 },
          currencies: ['EUR']
        }
      ])
    },
    settings: {
      currency: {
        base: 'JPY'
      }
    }
  }
  const expectedDefault = {
    kind: Transaction.defaultKind,
    isModalOpen: false,
    accountId: 'A12345',
    amount: '',
    currency: 'JPY',
    linkedAccountId: 'A12346',
    linkedAmount: '',
    linkedCurrency: 'EUR',
    tags: {
      [EXPENSE]: [],
      [INCOME]: []
    },
    date: format(new Date(), 'YYYY-MM-DD'),
    note: ''
  }

  expect(getDefaultState(state)).toEqual(expectedDefault)
})

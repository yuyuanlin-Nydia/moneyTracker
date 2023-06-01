interface IWalletQuery{
  type: number, 
  category: any[] ,
  date: string
}

type IWalletItem = Pick<IWalletQuery, 'type' | 'date'> & {
  category: number,
  amount: number,
  item: string
}

interface categories{
  value: string,
  name: string
}

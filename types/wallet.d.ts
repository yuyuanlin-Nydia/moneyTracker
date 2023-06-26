interface IWalletQuery{
  type: string, 
  category: string[] ,
  date: Dayjs[]
}

type IWalletItem = Pick<IWalletQuery, 'type'> & {
  _id: string,
  category: string,
  amount: number,
  item: string,
  date: string,
  recordAt: string
}

interface categories{
  value: string,
  name: string
}

interface getWalletRes{
  _id: string, 
  total: number,
  list: IWalletItem[] 
}

interface getLatestWalletRes{
  expense: IWalletItem[], 
  income: IWalletItem[]
}

interface getWalletTotalAmountResObj {
  type: string,
  total: number
}

interface getWalletAnalysisRes {
  category: string[],
  total: number[]
}

interface getWalletRateAndTotalRes{
  type: string,
  total: number,
  MoM: string,
  YoY: string
}

type IDoughnutData = {
  category: string[],
  total: number[]
}

type ILineDataObj = {
  label: string[],
  total: number[]
}

interface getAnalysisDataRes{
  doughnutData: IDoughnutData,
  lineData: ILineDataObj,
  top5: IWalletItem[]
}
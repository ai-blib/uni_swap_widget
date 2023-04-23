import { Currency } from '@uniswap/sdk-core'

import { SummaryRowProps } from '../components/Swap/Toolbar/ToolbarTradeSummary'
import { WrappedTokenInfo } from '../state/lists/wrappedTokenInfo'
const suppotTokens = ['ETH', 'USDC', 'DAI', 'USD']

export default class SetBaseMethod {
  public selectInputToken: ((update: Currency) => void) | undefined
  public selectOutToken: ((update: Currency) => void) | undefined
  addEvent: (() => void) | undefined
  public inputAmount: ((update: string, origin?: 'max') => void) | undefined
  public outAmount: ((update: string, origin?: 'max') => void) | undefined
  public swapEvent: (() => void) | undefined

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected swapError:(err: string)=>void = (err: string)=>{}
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected onInputAmountChange: (_inputAmount: string | undefined) => void = () => {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected onOutAmountChange: (_outAmount: string | undefined) => void = () => {}

  // information
  public swapInformation: any | SummaryRowProps[]
  public tokens: WrappedTokenInfo[] | undefined | any

  set setSelectInputToken(_selectInputToken: (update: Currency) => void) {
    this.selectInputToken = _selectInputToken
  }

  set setOutputToken(_selectOutToken: (update: Currency) => void) {
    this.selectOutToken = _selectOutToken
  }

  set setInputAmount(_selectInputToken: (update: string, origin?: 'max') => void) {
    this.inputAmount = _selectInputToken
  }

  set setOutAmount(_selectOutToken: (update: string, origin?: 'max') => void) {
    this.outAmount = _selectOutToken
  }

  set setSwapEvent(_func: (() => void) | undefined) {
    this.swapEvent = _func
  }

  set setInformation(_val: SummaryRowProps[]) {
    this.swapInformation = _val
  }

  set setSwapInformation(_val: SummaryRowProps[]) {
    this.swapInformation = _val
  }

  set Tokens(_val: WrappedTokenInfo[]) {
    this.tokens = _val.filter((_token) => {
      return suppotTokens.includes(_token.symbol)
    })
  }

  handleOnInputAmountChange(_input: string | undefined) {
    return this.onOutAmountChange(_input)
  }

  handleOnOutAmountChange(_out: string|undefined) {
    return this.onOutAmountChange(_out)
  }

  handleSwapError(err: string) {
    return this.swapError(err)
  }
}

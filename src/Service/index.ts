import BasMethod from './setBaseMethod'

class UniswapInterface extends BasMethod {
  // click swap
  public handleSwap() {
    this.swapEvent && this.swapEvent()
  }

  public listenerInputAmount(_fn: (_inputAmount: string|undefined) => void) {
    this.onInputAmountChange = _fn
  }
  
  public listenerSwapError(_fn:(err:string)=>void){
  
  }
  
  public listenerOutAmount(_fn: (_outAmount: string|undefined) => void) {
    this.onOutAmountChange = _fn
  }

  get getTokens() {
    return this.Tokens
  }

  get getSwapInformation() {
    return this.swapInformation
  }

  ListenerEvent(_event: () => void) {
    this.addEvent = _event
  }
}

const widget = new UniswapInterface()
// @ts-ignore
window.widget = widget
export default widget

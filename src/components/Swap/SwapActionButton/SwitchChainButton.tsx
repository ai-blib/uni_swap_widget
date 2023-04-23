import { Trans } from '@lingui/macro'
import { useWeb3React } from '@web3-react/core'
import ActionButton from 'components/ActionButton'
import { useAsyncError } from 'components/Error/ErrorBoundary'
import { getChainInfo } from 'constants/chainInfo'
import useSwitchChain from 'hooks/useSwitchChain'
import useTokenColorExtraction from 'hooks/useTokenColorExtraction'
import { useCallback, useMemo, useState } from 'react'
import UniswapInterface from 'Service'
/** A chain-switching ActionButton. */
export default function ChainSwitchButton({ chainId }: { chainId: number }) {
  const { account } = useWeb3React()
  const [isPending, setIsPending] = useState(false)
  const color = useTokenColorExtraction()

  const switchChain = useSwitchChain()
  const throwError = useAsyncError()
  const onSwitchChain = useCallback(async () => {
    setIsPending(true)
    try {
      await switchChain(chainId)
    } catch (error) {
      throwError(error)
    } finally {
      setIsPending(false)
    }
  }, [chainId, switchChain, throwError])

  const message = useMemo(() => {
    if (isPending) {
      UniswapInterface.handleSwapError(account ? `Switch network in your wallet` : `Switching network`)
      return account ? <Trans>Switch network in your wallet</Trans> : <Trans>Switching network</Trans>
    }

    const isChange = getChainInfo(chainId)

    UniswapInterface.handleSwapError(isChange ? `Connect to ${isChange?.label}` : `Switching network`)

    return isChange ? <Trans>Connect to {getChainInfo(chainId)?.label}</Trans> : <Trans>Switch network</Trans>
  }, [account, chainId, isPending])

  return (
    <ActionButton color={color} disabled={isPending} onClick={onSwitchChain}>
      {message}
    </ActionButton>
  )
}

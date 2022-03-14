/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import './shim.js';
import React from 'react';
import {AsyncStorage, Button, Text} from 'react-native';
import {
  useWalletConnect,
  withWalletConnect,
} from '@walletconnect/react-native-dapp';
import detectEthereumProvider from '@metamask/detect-provider'


function App() {
    const provider = detectEthereumProvider().then(r=>console.log(r));
  const tokenAddress = '0x1F8FF566a4F7DA66470fFd3EFC8f5b61CD9cD58E';
  const tokenSymbol = 'TST';
  const tokenDecimals = 18;
  const tokenImage = 'http://placekitten.com/200/300';
  const connector = useWalletConnect();
  if (!connector.connected) {
    /**
     *  Connect! 🎉
     */

    return <Button title="Connect" onPress={() => connector.connect()} />;
  }
  // <StripeProvider
  //   publishableKey={
  //     'pk_test_51JtFDhKcGyoXn23ihsuhvAWHciTwpCLecj6z5G5N9RD6Mw5BhJQkGf96dSoXTcJWeSslXsGuQEKTySdejxNmIq5y00J7VAjemn'
  //   }
  //   merchantIdentifier="merchant.identifier">
  //   <PaymentScreen />
  // </StripeProvider>
  return (
      <>
        {connector.connected && <Text>{connector.accounts[0]}</Text>}
        <Button
            title="Request"
            onPress={() => {
                connector.sendCustomRequest({
                    id:1,
                    method: 'wallet_addEthereumChain',
                    params: [{
                        chainId: '0x38',
                        chainName: 'Binance Smart Chain',
                        nativeCurrency: {
                            name: 'Binance Coin',
                            symbol: 'BNB',
                            decimals: 18
                        },
                        rpcUrls: ['https://bsc-dataseed.binance.org/'],
                        blockExplorerUrls: ['https://bscscan.com']
                    }]
                }).then((r)=>console.log(r)).catch((error) => {
                        console.log(error)
                    })
            }}
        />
        <Button title="Kill Session" onPress={() => connector.killSession()} />
      </>
  );
}

export default withWalletConnect(App, {
  redirectUrl: 'myapp2://',
  storageOptions: {
    asyncStorage: AsyncStorage,
  },
});
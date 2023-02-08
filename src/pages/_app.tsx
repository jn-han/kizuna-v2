import '../styles/globals.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThirdwebProvider, ChainId } from '@thirdweb-dev/react'
import { createReactClient, LivepeerConfig, studioProvider } from '@livepeer/react'
import NavBar from '../components/navigation/NavBar';


export default function App({ Component, pageProps }) {

  const desiredChainId = ChainId.Polygon;

  const queryClient = new QueryClient()

  const livepeerClient = createReactClient({
    provider: studioProvider({ apiKey: 'eecb8587-0ce0-49f8-bcef-53880665c8bc'})
  })

  return (
    <ThirdwebProvider desiredChainId={desiredChainId}>
      <QueryClientProvider client={queryClient}>
          <LivepeerConfig client={livepeerClient}>
            <NavBar/>
            <Component {...pageProps} />
          </LivepeerConfig>
      </QueryClientProvider>
    </ThirdwebProvider>

    
  )
  

}

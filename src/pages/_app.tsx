import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import { SessionProvider } from "next-auth/react"
import 'react-dropzone-uploader/dist/styles.css'
import AuthWrapper from '../components/AuthWrapper'

function MyApp({ Component, pageProps }: AppProps) {
  return(
    <SessionProvider session={pageProps.session} refetchInterval={0}>
      <AuthWrapper>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthWrapper>
    </SessionProvider>
  ) 
}

export default MyApp

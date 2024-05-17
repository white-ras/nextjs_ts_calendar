import '@/styles/globals.css'
import '@/styles/destyle.css'
import '@/styles/output.css'

import type { AppProps } from 'next/app'
import Modal from 'react-modal'
import { useEffect } from 'react'

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    Modal.setAppElement('#__next')
  }, [])

  return <Component {...pageProps} />
}

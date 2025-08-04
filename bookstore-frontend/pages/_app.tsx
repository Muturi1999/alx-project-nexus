import type { AppProps } from 'next/app'
import '../styles/globals.css'
import ErrorBoundary from '../components/ErrorBoundary'
// import React = require('react')
import * as React from 'react';


export default function App({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <Component {...pageProps} />
    </ErrorBoundary>
  )
}
// Libraries
import { BrowserRouter as Router } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { FloatButton } from 'antd'
import { ToastContainer } from 'react-toastify'
import { useEffect, useState } from 'react'

// Organnisms
import { Main } from 'apps/components/organisms/Main'
import Footer from './apps/components/organisms/Footer'
import Header from './apps/components/organisms/Header'

// Modules
import { Root } from 'apps/modules'
import LoadingPage from 'apps/components/molecules/LoadingPage'

// Turn off fresh data onfocus
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

function App() {
  const [showApp, setShowApp] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowApp(true)
    }, 1000)

    return () => {
      clearTimeout(timeout)
    }
  }, [])

  return (
    <>
      {showApp ? (
        <QueryClientProvider client={queryClient}>
          <Router>
            <Header />
            <Main>
              <Root />
              <ToastContainer autoClose={2000} />
            </Main>
            <FloatButton.BackTop />
            <Footer />
          </Router>

          <ReactQueryDevtools />
        </QueryClientProvider>
      ) : (
        <LoadingPage />
      )}
    </>
  )
}

export default App

// Libraries
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

// Organnisms
import { Main } from "apps/components/organisms/Main";
import Footer from "./apps/components/organisms/Footer";
import Header from "./apps/components/organisms/Header";

// Modules
import { Root } from "apps/modules";

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Header />
          <Main>
            <Root />
          </Main>
            <Footer />
        </Router>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
}

export default App;

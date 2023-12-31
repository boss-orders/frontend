import "./App.css";
import React from "react";
import Router from "./routes/Router";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <div className="App">
      <ChakraProvider>
        <Router />
      </ChakraProvider>
    </div>
  );
}

export default App;

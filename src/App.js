import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeScreen from './Screens/HomeScreen/HomeScreen';
import { PlayGround } from "./Screens/PlayGroundScreen/PlayGround";
// Context Hooks
import { PlaygroundProvider } from './Providers/PlaygroundProviders';
import { ModelProvider } from './Providers/ModelProvider';
import './App.css';
function App() {
  return (
    <PlaygroundProvider>
      <ModelProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<HomeScreen />} />
            <Route path='/playground/:fileId/:folderId' element={<PlayGround />} />
          </Routes>
        </BrowserRouter>
      </ModelProvider>
    </PlaygroundProvider>
  );
}

export default App;

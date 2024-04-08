import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Structure from "./pages/Structure";
import Home from "./pages/Home";
import Skills from "./pages/Skills";
import Completed from "./pages/Completed";
import Error from "./pages/Error";
import TabsOverview from "./test/TabsOverview.tsx"


export default function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Structure />}>
          <Route index element={<Home />}/>
          <Route path="skills" element={<Skills />}/>
          <Route path="completed" element={<Completed />}/>
          <Route path="*" element={<Error />}/>
          <Route path="tabsoverview" element={<TabsOverview />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
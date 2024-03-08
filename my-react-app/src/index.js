import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Structure from "./pages/Structure";
import Home from "./pages/Home";
import Skills from "./pages/Skills";
import Completed from "./pages/Completed";
import Error from "./pages/Error";
import Mui from "./test/Mui.tsx"
import Re from "./test/Re.tsx"
import ReactVis from './test/ReactVis.tsx';

export default function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Structure />}>
          <Route index element={<Home />}/>
          <Route path="skills" element={<Skills />}/>
          <Route path="completed" element={<Completed />}/>
          <Route path="*" element={<Error />}/>
          <Route path="mui" element={<Mui />}/>
          <Route path="re" element={<Re />}/>
          <Route path="reactvis" element={<ReactVis />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
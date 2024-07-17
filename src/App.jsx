import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import NewsBoard from './components/NewsBoard';

function App() {
  const [category, setCategory] = useState("general");
  const [search, setSearch] = useState("");

  return (
    <>
      <Navbar setCategory={setCategory} setSearch={setSearch} />
      <NewsBoard category={category} search={search} />
    </>
  );
}

export default App;

import { useState } from 'react'
import './App.css'
import Pagination from './Pagination'
import InfiniteScroll from './InfiniteScroll'

function App() {
  const [view, setView] = useState('pagination')

  return (
    <>
     <h1>Welcome to Random Users</h1>

      <nav className='nav' style={{
        display: 'flex',
        gap: '2em',
      }}>
        <button onClick={() => setView('pagination')}>Pagination</button>
        <button onClick={() => setView('infiniteScroll')}>Infinite Scroll</button>
      </nav>

      {view === 'pagination' && <Pagination />}
      {view === 'infiniteScroll' && <InfiniteScroll />}
   </>
  )
}

export default App

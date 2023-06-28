import React ,{useState,useEffect} from 'react'
import Users from './Users'
import { useQuery } from 'react-query'

const fetchUsers = async (page) => {
    //fecth data from api
    const res = await fetch(`https://randomuser.me/api/?page=${page}&results=10&seed=617a0ca0df967b9d`)  
    return res.json()
}

const Pagination = () => {
    const [page, setPage] = useState(1)

    const { data, isLoading, isError, error,isFetching,isPreviousData } = useQuery(['users',page], () => fetchUsers(page), {keepPreviousData:true})


    if(isLoading) return <h2>Loading ...</h2>

    if(isError) return <h2>Error : {error.message} </h2>

  return (
    <>
    <h1>Paginate view</h1>
    {data && (
        <div className="card" style={{
            display:"grid",
            gridTemplateColumns:"repeat(3,1fr)",
            gap:"2em"
    
        }}>
          {data?.results?.map(user => <Users key={user.email} user={user} />)}
        </div>
      )}


        <div style={{display:"flex",gap:"2em"}}>
      <button onClick={() => setPage(prev => Math.max(prev -1 ,0))} disabled={page ==1}>prev</button>
      <button onClick={() => setPage(prev => prev + 1)}>next</button>
        </div>

      <div>{isFetching ? 'Fetching...' : null}</div>
    </>
  )
}

export default Pagination
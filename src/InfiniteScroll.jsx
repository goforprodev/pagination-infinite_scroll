import React from 'react'
import {useInfiniteQuery} from 'react-query'
import Users from './Users'

const fetchUsers = async ({pageParam = 1}) => {
    const res = await fetch(`https://randomuser.me/api/?page=${pageParam}&results=10&seed=617a0ca0df967b9d`)
    return res.json()
}




const InfiniteScroll = () => {
    
    const {
            isLoading,
            isError,
            error,
            data,
            fetchNextPage,
            isFetching,
            isFetchingNextPage
        } = useInfiniteQuery(['colors'], fetchUsers, {
            getNextPageParam: (lastPage, pages) => {
                return lastPage.info.page + 1
            }
    })
    
    if(isLoading) return <h2>Loading ...</h2>
    if(isError) return <h2>Error : {error.message} </h2>
 return (
        <>
            <h2>Infinite Scroll View</h2>
            <div className="card" style={{
                display:"grid",
                gridTemplateColumns:"repeat(3,1fr)",
                gap:"2em"
            }}>
                {data.pages.map(page =>
                    page.results.map(user => <Users key={user.email} user={user} />)
                )}
            </div>
            <div className='btn-container'>
                <button onClick={fetchNextPage}>Load More</button>
            </div>
            <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
        </>
    )
}

export default InfiniteScroll
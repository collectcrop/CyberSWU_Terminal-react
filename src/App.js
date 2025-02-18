import { useSelector,useDispatch } from 'react-redux'
// import { increment,decrement,addToNum } from './store/modules/counterStore'
// import { fetchChannelList } from './store/modules/channelStore'
import { useEffect } from 'react'
function App(){
  /*
  const { count } = useSelector(state => state.counter)
  const { channelList } = useSelector(state => state.channel)
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(fetchChannelList())
  },[])
  */
  return (
  <div className="App">
    {/*
      <button onClick={() => dispatch(increment())}>+</button>
    {count}
    <button onClick={() => dispatch(decrement())}>-</button>
    <button onClick={() => dispatch(addToNum(5))}>to 5</button>
    <button onClick={() => dispatch(addToNum(10))}>to 10</button>
    <ul>
      {
        channelList.map(item => <li key={item.id}>{item.name}</li>)
      }
    </ul>
    */}
    
  </div>
  
  )
}

export default App;

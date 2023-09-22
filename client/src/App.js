import Listheader from './components/ListHeader'
import ListItem from './components/ListItem'
import { useEffect, useState } from 'react';

const App = () => {
  const userEmail = 'Rilo@test.com';
  const [ tasks, setTasks ] = useState(null);

  const getData = async () => {
    try {
      const response = await fetch(`http://localhost:8000/todos/${userEmail}`)
      const json = await response.json()
      setTasks(json)
    } catch (err){
      console.error(err)
    }
  }

  useEffect(() => getData, [])

  console.log(tasks);

  //Sort by date
  const sortedTasks = tasks?.sort((a,b) => new Date(a.date) - new Date(b.date))



  return (
    <div className="app">
      <Listheader listName={"Holiday tick list"}/>
      {sortedTasks?.map(<ListItem/>)}
    </div>
  );
}


export default App;

import React, { useState, useEffect } from 'react'
import Loading from './Loading'
import Tours from './Tours'
//API for content
const url = 'https://course-api.com/react-tours-project'
function App() {
  const [loading, setloading] = useState(true);
  const [tours, setTours] = useState([]);
  const removeTour = (id) => {
    const newTours = tours.filter((tour) => tour.id !== id);
    setTours(newTours);
  }
  const fetchTours = async () => {

    setloading(true);
    try {
      const resp = await fetch(url);
      const tours = await resp.json();
      setloading(false);
      setTours(tours);
      console.log(tours);
    }
    catch (error) {
      setloading(false);
      console.log(error);
    }

  }
  useEffect(() => fetchTours(), []);

  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }
  if (tours.length === 0) {
    return (
      <main>
        <div className="title">
          <h2>No Tours Left!!!</h2>
          <button className="btn" onClick={fetchTours}>Refresh</button>
        </div>
      </main>
    )
  }
  return (
    <main>
      <Tours tours={tours} removeTour={removeTour} />
    </main>
  );
}

export default App

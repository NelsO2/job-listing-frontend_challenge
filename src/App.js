import Background from "./components/backgroundHeader";
import JobContainer from "./components/JobContainer";
import { useEffect, useState } from "react";
import FilterDiv from "./components/FilterDiv";
import styles from "./components/jobs.module.css";
import dataItems from "./Data/data.json"
function App() {
  /* function to display jobs with react */
  const [listings, setListings] = useState([])
  const [filter, setFilter] = useState([])
  const [showDiv, setShowDiv] = useState(false)

  useEffect(() => {
    // filtering the job using the length of the array
    if (filter.length === 0) {
      setListings(dataItems)
      setShowDiv(false)
    }
  },[filter])


  const filterListings = (filter_by = '') => {
    // filtering by categories(languages, tools, role and level)
    if (!filter.includes(filter_by) && filter_by !== '') {
      setShowDiv(true)
      setFilter([...filter, filter_by])
      setListings(listings.filter(item => [...item.languages, ...item.tools, item.role, item.level].includes(filter_by)))
    }
  }


  const filterUnlisting = (filterIndex) => {
    const filters = [...filter]
    filters.splice(filterIndex, 1)
    setFilter(filters)
  }


  const clearFilter = () => {
    // function to remove job from list
    setShowDiv(false)
    const deleteAll = [...filter]
    deleteAll.splice(0, deleteAll.length)
    setFilter(deleteAll)
  }

  return (
    <>
      <Background />
      {showDiv ? (<div className={styles.row}>
        {filter.map((item, index) => <FilterDiv prop={() => filterUnlisting(index)} items={item} key={item.id}/>)}
        <div className={styles.clear} onClick={clearFilter}>Clear</div>
      </div>) : null}
      {listings.map(item => <JobContainer listing={item} key={item.id} filtering={filterListings} />)}
    </>
  );
}

export default App;


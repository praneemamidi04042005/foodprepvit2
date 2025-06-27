import {useState} from 'react'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDiplay from '../../components/FoodDisplay/FoodDisplay'
const Home = () => {
  const [category,setCategory] = useState('All')

  return (
    <div>
        <Header/>
        <ExploreMenu category={category} setCategory={setCategory}/>
        <FoodDiplay category={category}/>
    </div>
  )
}
export default Home
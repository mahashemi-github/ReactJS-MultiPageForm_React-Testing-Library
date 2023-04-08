import { DataContext } from '../context/DataContext'
import { useContext } from 'react'

const Followers = () => {
    const { followersList } = useContext(DataContext)

    return ( 
        <div className="followers-content">
            {followersList && followersList.map((item, index) => (
            <div className='followers-items' key={index} data-testid={`follower-item-${index}`} >
                <img src={`/${item.image}`} />
                <span>{item.name}</span> <hr/>
            </div>
            ))}
        </div>
     )
}
 
export default Followers
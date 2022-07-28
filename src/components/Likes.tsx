import axios from 'axios'
import React from 'react'
import {RiHeartAddLine, RiHeartFill} from 'react-icons/ri'
import { BASE_URL } from '../utils/config'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'

const Likes = ({likes, setLikes, id}) => {
    const [liked, setLiked] = React.useState(false)

    const {data: session} = useSession()

    async function handleLike(){
        if(!session){
            toast.error('Please login to like Memes')
            return
        }
        
        if(!liked){
            const updatedLikes = likes + 1
            setLiked(true)
            setLikes(updatedLikes)
            try{
                toast('Liked', { icon: '🧡', });
                const body = {id, updatedLikes}
                // await axios.post(`${BASE_URL}/api/meme/like`, {
                //     headers: { 'Content-Type': 'application/json' },
                //     body: JSON.stringify(body)
                // })
                await fetch(`${BASE_URL}/api/meme/like`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
                })
            }catch(err){
                console.error(err)
            }
        }
        if(liked){
            const updatedLikes = likes - 1
            setLiked(false)
            setLikes(updatedLikes)
            try{
                await toast('UnLiked', {icon: '💔',});
                const body = {id, updatedLikes}
                await fetch(`${BASE_URL}/api/meme/like`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
                })
            }catch(err){
                console.error(err)
            }
        }
    }
  return (
    <>
        <div className='flex justify-between'>
            <button onClick={handleLike} className="focus:outline-none">
                {liked ?  <RiHeartFill size={25} color={`#ffa31a`}/> : <RiHeartAddLine size={25} color={`#ffa31a`}/>} 
            </button> 
            {likes === 0 ? <h1 className='pt-1 pl-5'> No Likes</h1>
            : 
            <h1 className='pt-1 pl-5'> {likes} {likes < 10 ? 'Like' : 'Likes'}</h1>
            }
        </div>
    </>
  )
}

export default Likes
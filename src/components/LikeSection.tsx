import React from 'react'
import Likes from './Likes'

const LikeSection = ({likes, id, user, meme}) => {
  const [memelikes, setMemeLikes] = React.useState(likes)
  
  return (
    <>
      <Likes likes={memelikes} setLikes={setMemeLikes} id={id} user={user} meme={meme} />
    </>
  )
}

export default LikeSection
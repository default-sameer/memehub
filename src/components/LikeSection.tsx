import React from 'react'
import Likes from './Likes'

const LikeSection = ({likes, id}) => {
  const [memelikes, setMemeLikes] = React.useState(likes)
  
  return (
    <>
      <Likes likes={memelikes} setLikes={setMemeLikes} id={id} />
    </>
  )
}

export default LikeSection
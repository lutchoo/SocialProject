import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from "react-redux"
import { isEmpty } from '../Util';
import {UnFollowedUser, followedUser } from '../../app/slices/userSlice';


const FollowHandle = ({idToFollow, }) => {
    const userData = useSelector((state) => state.currentUser.user);
    const [isFollowed, setIsFollowed] = useState(false)
    const [followId, setfollowId] = useState(idToFollow)
    const dispatch = useDispatch()
  

    const handleFollow = ()=>{
        console.log('test:'+followId);
        dispatch(followedUser({followerId :userData._id,idToFollow}))
        setIsFollowed(true)
    }
    const handleUnfollow= ()=>{
        const idToUnFollow = idToFollow 
        console.log('test:'+followId);
        dispatch(UnFollowedUser({followerId :userData._id, idToUnFollow}))
        setIsFollowed(false)

    }
    useEffect(()=>{
        if(!isEmpty(userData.following)){
            if(userData.following.includes(idToFollow)){
                setIsFollowed(true)
            }else setIsFollowed(false)
        }

    },[userData, idToFollow])
  return (
    <>
    {isFollowed && !isEmpty(userData) && (
        <span onClick={handleUnfollow}>
            <button className='unfollow-btn'>Abonnée</button>
            
        </span>
    )}
        {isFollowed === false && !isEmpty(userData) &&(
            <span onClick={handleFollow}>
                <button>Suivre</button>
            </span>
        )}
    </>
  )
}

export default FollowHandle
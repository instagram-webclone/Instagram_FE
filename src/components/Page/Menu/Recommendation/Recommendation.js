import React, {useEffect} from "react";
import "./Recommendation.scss";
import RecommendCard from "./RecommendCard";
import {useDispatch, useSelector} from "react-redux";
import {randomPost} from "../../../../redux/post/post";

const Recommendation = () => {
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(randomPost())
  }, [dispatch])


  const random_list = useSelector(state => state.post.randomPosts);


  return (
    <>
      <div className="container">
        <div className="container_top_wrapper"/>
      <div className="recom">
        <div className="recommendation">
          {random_list && random_list.map((random) => (
            <RecommendCard
              _id={random._id}
              imageUrl={random.imageUrl}
              likeCount={random.likeCount}
              commentCount={random.commentCount}
            />
          ))}
        </div>
        </div>
      </div>
    </>
  )
}

export default Recommendation;
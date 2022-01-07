import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getPost } from '../../redux/post/post';

export default function InfiniteScrolling(page) {
  console.log(page);

  const dispatch = useDispatch();
  const post_data = useSelector((state) => state.post.posts);

  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([])
  const [hasMore, setHasMore] = useState(false);

  // const fetchPosts = async () => {
  //   setLoading(true);
  //   const res = await dispatch(getPost(page));
  //   console.log(res);
  //   console.log(page);
  //   setPosts((prevPosts) => [...prevPosts, ...res.payload.posts]);
  //   setHasMore(res.payload.posts.length > 0)
  //   setLoading(false);
  // };

  // useEffect(() => {
  //   fetchPosts();
  // }, [fetchPosts, page])
  // console.log(page);

  return { loading, posts, hasMore }
}
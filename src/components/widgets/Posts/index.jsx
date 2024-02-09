import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { postListActions as actions } from '../../../redux/features/postList/slice';

import Loading from '../../Loading';
import NewPost from '../NewPost';
import Post from '../Post';
import { Container } from './styles';

export default function Posts({ userId = false }) {
  const dispatch = useDispatch();

  const { isLoading, errors, posts } = useSelector((state) => state.postList);

  useEffect(() => {
    dispatch(actions.getPostList({ userId }));
  }, [userId]);

  return (
    <Container>
      <NewPost />
      {errors.map((error, index) => (
        <p className="error" key={index}>
          {error}
        </p>
      ))}
      {(isLoading && <Loading />) || posts.map((post, index) => <Post key={index} post={post} />)}
    </Container>
  );
}

Posts.propTypes = {
  userId: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([false])]),
};

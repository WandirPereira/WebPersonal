import React, { useState, useEffect } from 'react';
import { Loader, Pagination } from "semantic-ui-react";
import { size, map } from "lodash";
import { Post } from "../../../../api";
import { useAuth } from "../../../../hooks";
import { PostItem } from "../PostItem";
import "./ListPosts.scss";

const postController = new Post();

export  function ListPosts(props) {

  const { reload, onReload } = props;
  const [posts , setCourses] = useState(null);
  const { accessToken } = useAuth();
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState();


  useEffect(() => {
    (async () => {
      try {
        //setCourses(null);
        const response = await postController.getPosts(accessToken, {page} );

        //console.log(response);
        console.log(response.postsStored.docs);

        setCourses(response.postsStored.docs);
        setPagination({
            limit: response.postsStored.limit,
            page: response.postsStored.page,
            pages: response.postsStored.pages,
            total: response.postsStored.total,
        });
      } catch (error) {
        console.error(error);
      }
    })()
  }, [page, reload]);

  //console.log(courses);

  const changePage = (_, data) => {
    setPage(data.activePage);
  };

  if(!posts) return <Loader active inline="centered"/>
  if(size(posts) === 0) return "Não existe nenhum post cadastrado!";

  //console.log(courses);

  //return map(courses, (course) => <CourseItem key={course._id} course={course} onReload={onReload}/>)
  return (
    <div className="list-posts">
      {map(posts, (post) => (
        <PostItem key={post._id} post={post} onReload={onReload} />
      ))}

      <div className="list-posts__pagination">
        <Pagination
          totalPages={pagination.pages}
          defaultActivePage={pagination.page}
          ellipsisItem={null}
          firstItem={null}
          lastItem={null}
          onPageChange={changePage}
        />
      </div>
    </div>
  );
}



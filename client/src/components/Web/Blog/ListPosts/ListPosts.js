import React, { useState, useEffect } from "react";
import { Loader, Pagination } from "semantic-ui-react";
import { map } from "lodash";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Post } from "../../../../api";
import { ListPostItem } from "../ListPostItem";
import { useAuth } from "../../../../hooks";
import "./ListPosts.scss";

const postController = new Post();

export function ListPosts() {
  const { accessToken } = useAuth();
  const [posts, setPosts] = useState(null);
  const [pagination, setPagination] = useState();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(searchParams.get("page") || 1);

  useEffect(() => {
    (async () => {
      try {
        const response = await postController.getPosts(accessToken, {page});

        setPosts(response.postsStored.docs);
        setPagination({
          limit: response.postsStored.limit,
          page: response.postsStored.page,
          pages: response.postsStored.pages,
          total: response.postsStored.total,
        });
      } catch (error) {
        console.error(error);
      }
    })();
  }, [page]);

  console.log('ListPosts');
  console.log(posts);
 

  const changePage = (_, data) => {
    const newPage = data.activePage;
    setPage(newPage);
    navigate(`?page=${newPage}`);
  };

  if (!posts) return <Loader active inline="centered" />;

  return (
    <div className="list-posts-web">
      <div className="list">
        {map(posts, (post) => (
          <div key={post._id} className="item">
            <ListPostItem post={post} />
          </div>
        ))}
      </div>

      <div className="pagination">
        <Pagination
          totalPages={pagination.pages}
          defaultActivePage={pagination.page}
          ellipsisItem={null}
          firstItem={null}
          lastItem={null}
          secondary
          pointing
          onPageChange={changePage}
        />
      </div>
    </div>
  );
}

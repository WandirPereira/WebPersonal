import React, { useState, useEffect } from 'react';
import { Loader, Pagination } from "semantic-ui-react";
import { size, map } from "lodash";
import { Course } from "../../../../api";
import { useAuth } from "../../../../hooks";
import { CourseItem } from "../CourseItem";
import "./ListCourses.scss";

const courseController = new Course();

export  function ListCourses(props) {

  const { reload, onReload } = props;
  const [courses, setCourses] = useState(null);
  const { accessToken } = useAuth();
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState();


  useEffect(() => {
    (async () => {
      try {
        //setCourses(null);
        const response = await courseController.getCourses(accessToken, {page} );

        //console.log(response);
        //console.log(response.courses.docs);

        setCourses(response.courses.docs);
        setPagination({
            limit: response.courses.limit,
            page: response.courses.page,
            pages: response.courses.pages,
            total: response.courses.total,
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

  if(!courses) return <Loader active inline="centered"/>
  if(size(courses) === 0) return "Não existem nenhum usuário cadastrado!";

  //console.log(courses);

  //return map(courses, (course) => <CourseItem key={course._id} course={course} onReload={onReload}/>)
  return (
    <div className="list-courses">
      {map(courses, (course) => (
        <CourseItem key={course._id} course={course} onReload={onReload} />
      ))}

      <div className="list-courses__pagination">
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



import React, { useState, useEffect } from "react";
import { Container, Image, Button } from "semantic-ui-react";
import { map } from "lodash";
import { Course as CourseController } from "../../../api";
import { image } from "../../../assets";
import { Course } from "../../../components/Web/Courses";
import { useAuth } from "../../../hooks";
import "./Courses.scss";

const courseController = new CourseController();

export function Courses() {
  const { accessToken } = useAuth();
  const [courses, setCourses] = useState(null);
  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(1);
  const isCurrentLastPage = pagination?.page === pagination?.pages;

  useEffect(() => {
    (async () => {
      try {
        const response = await courseController.getCourses(accessToken,{ page, limit: 2 });
        setPagination({
          page: response.courses.page,
          pages: response.courses.pages,
        });

        if (!courses) setCourses(response.courses.docs);
        else setCourses([...courses, ...response.courses.docs]);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [page]);

  const loadMore = () => {
    setPage((prevState) => prevState + 1);
  };

  return (
    <Container className="courses-page">
      <Image src={image.academyLogo} />
      <h2>
        Na página Web você irá encontrar os melhores cursos online de programação.
      </h2>

      <div className="courses">
        {map(courses, (course) => (
          <div key={course._id} className="courses__item">
            <Course course={course} />
          </div>
        ))}
      </div>

      {!isCurrentLastPage && (
        <div className="more">
          <Button primary onClick={loadMore}>
            Carregar mais...
          </Button>
        </div>
      )}
    </Container>
  );
}

import React, { useState, useEffect } from "react";
import { Container, Image, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { map } from "lodash";
import { Course } from "../../../api";
import { ENV } from "../../../utils";
import { useAuth } from "../../../hooks";
import "./HomeCourses.scss";

const courseController = new Course();

export function HomeCourses() {

  const { accessToken } = useAuth();
  const [courses, setCourses] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await courseController.getCourses(accessToken,{ limit: 6 });
        setCourses(response.courses.docs);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <Container className="home-courses">
      <h2>Aprenda e melhore suas habilidades</h2>

      <div className="home-courses__all-courses">
        {map(courses, (course) => (
          <a key={course._id} href={course.url} target="_blank" rel="noreferrer">
            <Image src={`${ENV.BASE_PATH}/${course.miniature}`} />
            <div>
              <span>{course.title}</span>
              <span>{course.description}</span>
            </div>
          </a>
        ))}
      </div>

      <div className="home-courses__more">
        <Button as={Link} to="/courses" primary>
          Ver mais
        </Button>
      </div>
    </Container>
  );
}

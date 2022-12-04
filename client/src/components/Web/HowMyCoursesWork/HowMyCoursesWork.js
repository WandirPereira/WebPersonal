import React from "react";
import { Container, Icon } from "semantic-ui-react";
import { map } from "lodash";
import { itemsData } from "./HowMyCoursesWork.data";
import "./HowMyCoursesWork.scss";

export function HowMyCoursesWork() {
  return (
    <Container className="how-my-courses-work">
      <h2>COMO FUNCIONAM OS CURSOS?</h2>
      <h4>
        Cada curso disponibiliza conteúdo multimedia, ativo as 24 horas do dia, 365 dias por ano
      </h4>

      <div className="how-my-courses-work__items">
        {map(itemsData, (item, index) => (
          <div key={index}>
            <div>
              <Icon name={item.icon} />
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}

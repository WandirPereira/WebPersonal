import React from "react";
import { Container } from "semantic-ui-react";
import "./Banner.scss";

export function Banner() {
  return (
    <div className="banner">
      <Container>
        <h1>
          Aprenda novas <br /> tecnologias web e móveis
        </h1>
        <h2>
          Através de cursos práticos, concisos e atualizados, criados por
          <br />
          professionais com anos de experiência.
        </h2>
      </Container>

      <div className="banner__dark" />
    </div>
  );
}

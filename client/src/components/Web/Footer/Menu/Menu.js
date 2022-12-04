import React from "react";
import { Grid, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "./Menu.scss";

export function Menu() {
  return (
    <div className="footer-menu">
      <h4>Navegacão</h4>

      <Grid columns={2}>
        <Grid.Column>
          <Link to="/courses">
            <Icon name="book" /> Cursos online
          </Link>
          <Link to="#">
            <Icon name="code" /> Desenvolvimento Web
          </Link>
          <Link to="#">
            <Icon name="database" /> Bases de dados
          </Link>
          <Link to="#">
            <Icon name="code" /> UI/UX
          </Link>
        </Grid.Column>

        <Grid.Column>
          <Link to="#">
            <Icon name="server" /> Sistemas / Servidores
          </Link>
          <Link to="#">
            <Icon name="cogs" /> CMS
          </Link>
          <Link to="#">
            <Icon name="user outline" /> Porfolio
          </Link>
          <Link to="#">
            <Icon name="python" /> Backend
          </Link>
        </Grid.Column>
      </Grid>
    </div>
  );
}

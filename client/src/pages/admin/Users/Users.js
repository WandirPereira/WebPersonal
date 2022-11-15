import React, { useState } from 'react';
import { Tab, Button } from "semantic-ui-react";
import "./Users.scss";
import { UsersForm } from "../../../componentes/Admin/Users"
import { BasicModal } from "../../../componentes/Shared";

export function Users() {

  const [showModal, setShowModal] = useState(false);

  const onOpenCloseModal = () => setShowModal((prevState) => !prevState );
  
  const panes = [
    {
      menuItem: "Usuários ativos",
      render: () => (
        <Tab.Pane attached={false}>
          <h2>Usuários ativos</h2>
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Usuários inativos",
      render: () => (
        <Tab.Pane attached={false}>
          <h2>Usuários inativos</h2>
        </Tab.Pane>
      ),
    },
  ];

  return (
    <>
      <div className='users-page'>
        <Button className='users-page__add' primary onClick={ onOpenCloseModal }>
          Novo Usuário
        </Button>
        <Tab menu={{ secondary: true }} panes={panes} />
      </div>

      <BasicModal 
        show={ showModal } 
        close={ onOpenCloseModal } 
        title="Criar novo usuário"
      >
          <UsersForm close={onOpenCloseModal} />
      </BasicModal>
    </>
  );
}

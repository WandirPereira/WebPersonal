import React, { useState } from 'react';
import { Tab, Button } from "semantic-ui-react";
import "./Menu.scss";
import { BasicModal } from "../../../components/Shared";
import { MenuForm, ListMenus } from "../../../components/Admin/Menus"

export function Menu() {
  const [showModal, setShowModal] = useState(false);
  const [reload, setReload] = useState(false);

  const onOpenCloseModal = () => setShowModal((prevState) => !prevState );
  const onReload = () => setReload((prevState) => !prevState);
  
  const panes = [
    {
      menuItem: "Menus ativos",
      render: () => (
        <Tab.Pane attached={false}>
            <ListMenus menusActive={true} reload={reload} onReload={onReload}/>
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Menus inativos",
      render: () => (
        <Tab.Pane attached={false}>
            <ListMenus menusActive={false} reload={reload} onReload={onReload}/>
        </Tab.Pane>
      ),
    },
  ];

  return (
    <>
      <div className='menus-page'>
        <Button className='menus-page__add' primary onClick={ onOpenCloseModal }>
          Novo Menu
        </Button>
        <Tab menu={{ secondary: true }} panes={panes} />
      </div>

      <BasicModal 
        show={ showModal } 
        close={ onOpenCloseModal } 
        title="Criar novo menu"
      >
          
          <MenuForm close={onOpenCloseModal}  onReload={onReload}/> 
      </BasicModal>
    </>
  );
}

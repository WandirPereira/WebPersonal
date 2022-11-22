import React, { useState } from 'react';
import { Tab } from "semantic-ui-react";
import "./Newsletter.scss";
//import { BasicModal } from "../../../componentes/Shared";
import { ListNewsletters } from "../../../componentes/Admin/Newsletter"

export function Newsletter() {
  //const [showModal, setShowModal] = useState(false);
  const [reload, setReload] = useState(false);

  //const onOpenCloseModal = () => setShowModal((prevState) => !prevState );
  const onReload = () => setReload((prevState) => !prevState);
  
  const panes = [
    {
      menuItem: "E-mails",
      render: () => (
        <Tab.Pane attached={false}>
            <ListNewsletters reload={reload} onReload={onReload}/> 
        </Tab.Pane>
      ),
    },
  ];

  return (
    <>
      <div className='newsletter-page'>
        <Tab menu={{ secondary: true }} panes={panes} />
      </div>

      {/* <BasicModal 
        show={ showModal } 
        close={ onOpenCloseModal } 
        title="Criar novo e-mail"
      >
          <MenuForm close={onOpenCloseModal}  onReload={onReload}/> 
      </BasicModal> */}
    </>
  );
}

import React, { useState } from 'react';
import { Tab } from "semantic-ui-react";
import "./Newsletter.scss";
import { ListNewsletters } from "../../../components/Admin/Newsletter"

export function Newsletter() {

  const [reload, setReload] = useState(false);

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
    </>
  );
}

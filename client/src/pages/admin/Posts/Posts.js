import React, { useState } from 'react';
import { Tab, Button } from "semantic-ui-react";
import "./Posts.scss";
import {  ListPosts, PostForm } from "../../../components/Admin/Posts"
import { BasicModal } from "../../../components/Shared";  

export function Posts() {

  const [showModal, setShowModal] = useState(false);
  const [reload, setReload] = useState(false);

  const onOpenCloseModal = () => setShowModal((prevState) => !prevState );
  const onReload = () => setReload((prevState) => !prevState);
  
  const panes = [
    {
      menuItem: "Posts",
      render: () => (
        <Tab.Pane attached={false}>
           <ListPosts reload={reload} onReload={onReload}/> 
        </Tab.Pane>
      ),
    },
  ];

  return (
    <>
      <div className='posts-page'>
        <Button className='posts-page__add' primary onClick={ onOpenCloseModal }>
          Novo Post
        </Button>
        <Tab menu={{ secondary: true }} panes={panes} />
      </div>

      <BasicModal 
        show={ showModal } 
        close={ onOpenCloseModal } 
        title="Criar novo post"
      >
          
          <PostForm close={onOpenCloseModal}  onReload={onReload}/>
      </BasicModal>
    </>
  );
}

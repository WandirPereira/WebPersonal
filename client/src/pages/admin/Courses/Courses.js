import React, { useState } from 'react';
import { Tab, Button } from "semantic-ui-react";
import "./Courses.scss";
import {  ListCourses, CourseForm } from "../../../components/Admin/Courses"
import { BasicModal } from "../../../components/Shared";

export function Courses() {

  const [showModal, setShowModal] = useState(false);
  const [reload, setReload] = useState(false);

  const onOpenCloseModal = () => setShowModal((prevState) => !prevState );
  const onReload = () => setReload((prevState) => !prevState);
  
  const panes = [
    {
      menuItem: "Cursos",
      render: () => (
        <Tab.Pane attached={false}>
            <ListCourses reload={reload} onReload={onReload}/> 
        </Tab.Pane>
      ),
    },
  ];

  return (
    <>
      <div className='courses-page'>
        <Button className='courses-page__add' primary onClick={ onOpenCloseModal }>
          Novo curso
        </Button>
        <Tab menu={{ secondary: true }} panes={panes} />
      </div>

      <BasicModal 
        show={ showModal } 
        close={ onOpenCloseModal } 
        title="Criar novo curso"
      >
          
          <CourseForm close={onOpenCloseModal}  onReload={onReload}/>
      </BasicModal>
    </>
  );
}

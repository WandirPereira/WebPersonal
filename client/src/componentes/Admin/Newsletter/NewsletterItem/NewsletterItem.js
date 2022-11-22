
import React, { useState } from 'react';
import { Button, Icon, Confirm } from 'semantic-ui-react';
import { Newsletter } from '../../../../api';
//import { image } from "../../../../assets";
//import { ENV } from "../../../../utils";
//import { BasicModal } from "../../../Shared";
import { useAuth } from "../../../../hooks";
import "./NewsletterItem.scss";

const newsletterController = new Newsletter();

export  function NewsletterItem(props) {
    const {newsletter, onReload } = props;
    const { accessToken } = useAuth();

    console.log(newsletter);

    //const [showModal, setShowModal] = useState(false);
    //const [titleModal, setTitleModal]= useState("");

    const [showConfirm, setShowConfirm] =  useState(false);
    
    //const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
    const onOpenCloseConfirm = () => setShowConfirm((prevState) => !prevState);

    // const openUpdateCourse = () => {
    //     setTitleModal(`Atualizar ${course.title}`);
    //     onOpenCloseModal();
    // }


    const onDelete = async () => {
        try {
            await newsletterController.deleteNewslettter(accessToken, newsletter._id);
            onReload();
            onOpenCloseConfirm();
        } catch (error) {
            console.error(error);
        }
    }

  return (
    <>
        <div className='email-item'>
            <div className='email-item__info'>
                <div>
                    <p>{newsletter.email}</p>
                </div>
            </div>
       
            <div>
                {/* <Button icon as="a" href={newsletter.url} target="_blank">
                    <Icon name="eye" />
                </Button> */}
                {/* <Button icon primary>
                    <Icon name= "pencil" onClick={openUpdateCourse}/>
                </Button> */}
                <Button icon color="red" onClick={onOpenCloseConfirm}>
                    <Icon name= "trash"/>
                </Button>
            </div>
        </div>

        {/* <BasicModal show={showModal} close={onOpenCloseModal} title={titleModal}>
           <CourseForm close={onOpenCloseModal} onReload={onReload} course={course} />
        </BasicModal>  */}

        <Confirm 
            open={showConfirm}
            onCancel={onOpenCloseConfirm}
            onConfirm= {onDelete}
            content={`Excluir o e-mail ${newsletter.email}?`}
            size="mini"
        />

    </>
  )
}

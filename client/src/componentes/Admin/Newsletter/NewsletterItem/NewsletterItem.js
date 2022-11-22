
import React, { useState } from 'react';
import { Button, Icon, Confirm } from 'semantic-ui-react';
import { Newsletter } from '../../../../api';
import { useAuth } from "../../../../hooks";
import "./NewsletterItem.scss";

const newsletterController = new Newsletter();

export  function NewsletterItem(props) {
    const {newsletter, onReload } = props;
    const { accessToken } = useAuth();

    const [showConfirm, setShowConfirm] =  useState(false);
    
    const onOpenCloseConfirm = () => setShowConfirm((prevState) => !prevState);

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
                <Button icon color="red" onClick={onOpenCloseConfirm}>
                    <Icon name= "trash"/>
                </Button>
            </div>
        </div>

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

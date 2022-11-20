import React, { useState } from 'react';
import { Image, Button, Icon, Confirm } from 'semantic-ui-react';
import { Menu } from '../../../../api';
import { image } from "../../../../assets";
import { ENV } from "../../../../utils";
import { BasicModal } from "../../../Shared";
import { useAuth } from "../../../../hooks";
import { MenuForm} from "../MenuForm";
import "./MenuItem.scss";

const menuController = new Menu();

export  function MenuItem(props) {
    const {menu, onReload } = props;
    const { accessToken } = useAuth();

    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal]= useState("");

    const [showConfirm, setShowConfirm] =  useState(false);
    const [confirmMessage, setConfirmMessage]  = useState("");
    
    const [isDelete, setIsDelete] = useState(false);

    const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
    const onOpenCloseConfirm = () => setShowConfirm((prevState) => !prevState);

    const openUpdateMenu = () => {
        setTitleModal(`Atualizar ${menu.title}`);
        onOpenCloseModal();
    }

    const openDesactivateActivateConfirm = () => {
        setIsDelete(false);
        setConfirmMessage(menu.active ? `Desativar menu ${menu.title}` : `Ativar menu ${menu.title}`);
        onOpenCloseConfirm();
    }

    const onActivateDesactivate = async () => {
        try {
            await menuController.updateMenu(accessToken, menu._id, { active: !menu.active});
            onReload();
            onOpenCloseConfirm();
        } catch (error) {
            console.error(error);
        }
    }

    const onDelete = async () => {
        try {
            await menuController.deleteMenu(accessToken, menu._id);
            onReload();
            onOpenCloseConfirm();
        } catch (error) {
            console.error(error);
        }
    }

    const openDeleteConfirm = () => {
        setIsDelete(true);
        setConfirmMessage(`Excluir menu ${menu.title}?`);
        onOpenCloseConfirm();
    }

  return (
    <>
        <div className='menu-item'>
            <div className='menu-item__info'>
                {/* <Image avatar src={user.avatar ? `${ENV.BASE_PATH}/${user.avatar}` :  image.noAvatar} /> */}
                <span className="menu-item__info-title">{menu.title}</span>
                <span className="menu-item__info-path">{menu.path}</span>
            </div>
       
            <div>
                <Button icon primary>
                    <Icon name= "pencil" onClick={openUpdateMenu}/>
                </Button>
                <Button icon color={menu.active ? "orange" : "teal"}  onClick={openDesactivateActivateConfirm}>
                    <Icon name={menu.active ? "ban": "check"} />
                </Button>
                <Button icon color="red" onClick={openDeleteConfirm}>
                    <Icon name= "trash"/>
                </Button>
            </div>
        </div>

        <BasicModal show={showModal} close={onOpenCloseModal} title={titleModal}>
           <MenuForm close={onOpenCloseModal} onReload={onReload} menu={menu} />
        </BasicModal> 

        <Confirm 
            open={showConfirm}
            onCancel={onOpenCloseConfirm}
            onConfirm={isDelete ? onDelete : onActivateDesactivate }
            content={confirmMessage}
            size="mini"
        />

    </>
  )
}

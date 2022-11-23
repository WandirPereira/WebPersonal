import React, { useState } from 'react';
import { Image, Button, Icon, Confirm } from 'semantic-ui-react';
import { Link } from "react-router-dom";
import { Post } from '../../../../api';
import { ENV } from "../../../../utils";
import { BasicModal } from "../../../Shared";
import { useAuth } from "../../../../hooks";
import { PostForm} from "../PostForm";
import "./PostItem.scss";

const postController = new Post();

export  function PostItem(props) {
    const {post, onReload } = props;
    const { accessToken } = useAuth();

    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal]= useState("");

    const [showConfirm, setShowConfirm] =  useState(false);
    
    const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
    const onOpenCloseConfirm = () => setShowConfirm((prevState) => !prevState);

    const openUpdatePost = () => {
        setTitleModal(`Atualizar ${post.title}`);
        onOpenCloseModal();
    }


    const onDelete = async () => {
        try {
            await postController.deletePost(accessToken, post._id);
            onReload();
            onOpenCloseConfirm();
        } catch (error) {
            console.error(error);
        }
    }

  return (
    <>
        <div className='post-item'>
            <div className='post-item__info'>
                <Image avatar src={`${ENV.BASE_PATH}/${post.miniature}`} />
                <div>
                    <p>{post.title}</p>
                    <p>{post.path}</p>
                </div>
            </div>
       
            <div>
                <Button as={Link} icon to={`/blog/${post.path}`} target="_blank">
                    <Icon name="eye" />
                </Button>
                <Button icon primary>
                    <Icon name= "pencil" onClick={openUpdatePost}/>
                </Button>
                <Button icon color="red" onClick={onOpenCloseConfirm}>
                    <Icon name= "trash"/>
                </Button>
            </div>
        </div>

        <BasicModal show={showModal} close={onOpenCloseModal} title={titleModal}>
           <PostForm close={onOpenCloseModal} onReload={onReload} post={post} />
        </BasicModal> 

        <Confirm 
            open={showConfirm}
            onCancel={onOpenCloseConfirm}
            onConfirm= {onDelete}
            content={`Excluir o post ${post.title}?`}
            size="mini"
        />

    </>
  )
}

import React from 'react';
import { Image, Button, Icon, Confirm } from 'semantic-ui-react';
import { User } from '../../../../api';
import { image } from "../../../../assets";
import { ENV } from "../../../../utils";
import "./UserItem.scss";

export  function UserItem(props) {
    const {user} = props;
  return (
    <>
        <div className='user-item'>
            <div className='user-item__info'>
                <Image avatar src={user.avatar ? `${ENV.BASE_PATH}/${user.avatar}` :  image.noAvatar} />
                <div>
                    <p>{user.firstname} {user.lastname}</p>
                    <p>{user.email}</p>
                </div>
            </div>
       
            <div>
                <Button icon primary>
                    <Icon name= "pencil"/>
                </Button>
                <Button icon color={user.active ? "orange" : "teal"}>
                    <Icon name={user.active ? "ban": "check"} />
                </Button>
                <Button icon color="red">
                    <Icon name= "trash"/>
                </Button>
            </div>
        </div>
    </>
  )
}

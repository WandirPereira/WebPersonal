import React, { useState, useEffect } from 'react';
import { Loader } from "semantic-ui-react";
import { size, map } from "lodash";
import { Menu } from "../../../../api";
import { useAuth } from "../../../../hooks";
import { MenuItem } from "../MenuItem";

const menuController = new Menu();

export  function ListMenus(props) {

  const { menusActive, reload, onReload } = props;
  const [menus, setMenus] = useState(null);
  const { accessToken } = useAuth();

  console.log(menus);

  useEffect(() => {
    (async () => {
      try {
        setMenus(null);
        const response = await menuController.getMenus(accessToken, menusActive);
        setMenus(response);
      } catch (error) {
        console.error(error);
      }
    })()
  }, [menusActive, reload])

  if(!menus) return <Loader active inline="centered"/>
  if(size(menus) === 0) return "Não existem nenhum menu cadastrado!";

  return map(menus, (menu) => ( <MenuItem key={menu._id} menu={menu} onReload={onReload}/>));
}

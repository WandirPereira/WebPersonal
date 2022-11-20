import { ENV } from "../utils";

export class Menu {

    baseApi = ENV.BASE_API;


    async createMenu(accessToken, data){
        try {
           const url = `${this.baseApi}/${ENV.API_ROUTES.MENU}`;
           const params = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(data),
              };

           const response = await fetch(url, params);

           const result = await response.json();

           if(response.status !== 201) throw result;

           return result;


        } catch (error) {
            throw error;
        }
    }

    async getMenus(accessToken, active = undefined) {
        try {
            const url = `${this.baseApi}/${ENV.API_ROUTES.MENU}?active=${active}`;
            const params = {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                },
            };

            const response = await fetch(url, params);
            const result = await response.json();

            if (response.status !== 200) throw result;

            return result;
        } catch (error) {
            throw error;
        }
    }

    async deleteMenu(accessToken, idMenu){
        try {
           const url = `${this.baseApi}/${ENV.API_ROUTES.MENU}/${idMenu}`;
           const params = {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
           };

           const response = await fetch(url, params);
           const result = await response.json();

           if(response.status !== 200) throw result;

           return result;
        } catch (error) {
            throw error;
        }
    }

    async updateMenu(accessToken, idMenu, menuData){
        try {
           const url = `${this.baseApi}/${ENV.API_ROUTES.MENU}/${idMenu}`;
           const params = {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(menuData),
           };

           const response = await fetch(url, params);
           const result = await response.json();

           if(response.status !== 200) throw result;

           return result;
        } catch (error) {
            throw error;
        }
    }
}
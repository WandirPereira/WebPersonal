import { ENV } from "../utils";

export class Newsletter {

    baseApi = ENV.BASE_API;

    async getNewsletters(accessToken, parameters) {
        try {

            const pageFilter = `page=${parameters?.page || 1}`;
            const limitFilter = `limit=${parameters?.limit || 10}`;
            const url = `${this.baseApi}/${ENV.API_ROUTES.NEWSLETTER}?${pageFilter}&${limitFilter}`;
            const params = {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                },
            };

            const response = await fetch(url, params);
            const result = await response.json();

            console.log(response);

            if (response.status !== 200) throw result;

            return result;
        } catch (error) {
            throw error;
        }
    }

    async deleteNewslettter(accessToken, idNewsletter){
        try {
           const url = `${this.baseApi}/${ENV.API_ROUTES.NEWSLETTER}/${idNewsletter}`;
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

}
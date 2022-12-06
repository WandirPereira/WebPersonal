import { ENV } from "../utils";

export class Post {

    baseApi = ENV.BASE_API;

    async getPosts(accessToken, parameters) {
        try {
            console.log(accessToken);
            console.log(parameters);
            const pageFilter = `page=${parameters?.page || 1}`;
            const limitFilter = `limit=${parameters?.limit || 4}`;
            const url = `${this.baseApi}/${ENV.API_ROUTES.POSTS}?${pageFilter}&${limitFilter}`;
            console.log(url);
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
    

    async getPost(accessToken, path) {
        try {

            const url = `${this.baseApi}/${ENV.API_ROUTES.POST}?${path}`;
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

    async deletePost(accessToken, idPost){
        try {
           const url = `${this.baseApi}/${ENV.API_ROUTES.POST}/${idPost}`;
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

    async createPost(accessToken, data){
        try {
           const formData = new FormData();
           Object.keys(data).forEach((key) => {
               formData.append(key, data[key]);
               //console.log(key);
           });

            //console.log(data.fileAvatar);
            if (data.file) {
                formData.append("miniature", data.file);
            }

           //console.log(data);

           const url = `${this.baseApi}/${ENV.API_ROUTES.POST}`;
           const params = {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                body: formData,
           };

           const response = await fetch(url, params);

           const result = await response.json();

           if(response.status !== 201) throw result;

           return result;


        } catch (error) {
            throw error;
        }
    }

    async updatePost(accessToken, idPost, data){
        try {
           const formData = new FormData();
           Object.keys(data).forEach((key) => {
               formData.append(key, data[key]);
               //console.log(key);
           });

            //console.log(data.fileAvatar);
            if (data.file) {
                formData.append("miniature", data.file);
            }

           //console.log(data);

           const url = `${this.baseApi}/${ENV.API_ROUTES.POST}/${idPost}`;
           const params = {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                body: formData,
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
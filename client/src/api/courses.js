import { ENV } from "../utils";

export class Course {

    baseApi = ENV.BASE_API;

    async getCourses(accessToken, parameters) {
        try {

            const pageFilter = `page=${parameters?.page || 1}`;
            const limitFilter = `limit=${parameters?.limit || 10}`;
            const url = `${this.baseApi}/${ENV.API_ROUTES.COURSES}?${pageFilter}&${limitFilter}`;
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

    async deleteCourse(accessToken, idCourse){
        try {
           const url = `${this.baseApi}/${ENV.API_ROUTES.COURSE}/${idCourse}`;
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

    async createCourse(accessToken, data){
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

           const url = `${this.baseApi}/${ENV.API_ROUTES.COURSE}`;
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

    async updateCourse(accessToken, idCourse, data){
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

           const url = `${this.baseApi}/${ENV.API_ROUTES.COURSE}/${idCourse}`;
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
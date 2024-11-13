class AppConfig{
    baseUrl = "http://localhost:5000/api";
    login = "http://localhost:5000/api/auth/login";
    users = "http://localhost:5000/api/users";
    register = "http://localhost:5000/api/auth/register";
    updateProfile = "http://localhost:5000/api/users/update";
    delete = "http://localhost:5000/api/users/delete/";
    toggleBlock = "http://localhost:5000/api/users/toggle-block/";
}


export const appConfig = new AppConfig();
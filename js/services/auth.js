/** AuthService - класс для отправки запросов на сервер */
class AuthService {

    /**
     * @description Отправляет запрос для входа на сервер с данными с инпутов
     * @param {String} email - "email" с инпута формы входа
     * @param {String} password - "password" с инпута формы входа
     */
    login(email, password) {
        return new Promise((resolve, reject) => {
            fetch(`${env.apiUrl}/public/auth/login`, {
                    method: "POST",
                    body: JSON.stringify({ email, password }),
                    headers: {
                        "Content-type": "application/json"
                    }
                })
                .then((response) => response.json())
                .then((data) => resolve(data))
                .catch((error) => reject(error));
        });
    }
}
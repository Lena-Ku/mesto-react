
class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
    }

    getAllCards() {
        return fetch(`${this._url}/cards`, {
            method: 'GET',
            headers: this._headers
        })
        .then((res) => {
            if(res.ok) {
                return res.json();
            } 
                return Promise.reject(new Error(`Ошибка: ${res.status}`));
        })
    }

    addCard(data) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(data)
        })
        .then((res) => {
            if(res.ok) {
                return res.json();
            } 
            return Promise.reject(new Error(`Ошибка: ${res.status}`));
        })
    }

    getUser() {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: this._headers
        })
        .then((res) => {
            if(res.ok) {
                return res.json();
            } 
            return Promise.reject(new Error(`Ошибка: ${res.status}`));
        })
    }

    changeUser(data) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(data)
        })
        .then((res) => {
            if(res.ok) {
                return res.json();
            } 
            return Promise.reject(new Error(`Ошибка: ${res.status}`));
        })
    }

    addLikeCard(id) {
        return fetch(`${this._url}/cards/likes/${id}`, {
            method: 'PUT',
            headers: this._headers,
        })
        .then((res) => {
            if(res.ok) {
                return res.json();
                
            } 
            return Promise.reject(new Error(`Ошибка: ${res.status}`));
        })
    }

    deleteLikeCard(id) {
        return fetch(`${this._url}/cards/likes/${id}`, {
            method: 'DELETE',
            headers: this._headers,
        })
        .then((res) => {
            if(res.ok) {
                return res.json();
                
            } 
            return Promise.reject(new Error(`Ошибка: ${res.status}`));
        })
    }

    deleteCard(id) {
        return fetch(`${this._url}/cards/${id}`, {
            method: 'DELETE',
            headers: this._headers,
        })
        .then((res) => {
            if(res.ok) {  
                return res.json();
            } 
            return Promise.reject(new Error(`Ошибка: ${res.status}`));
        })
    }

    changeAvatar(data) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(data)
        })
        .then((res) => {
            if(res.ok) {
                return res.json();
            } 
            return Promise.reject(new Error(`Ошибка: ${res.status}`));
        })
    }
}

const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-15',
    headers: {
      authorization: '7e627ef0-77cd-4561-9d53-13c991e33a34',
      'Content-Type': 'application/json'
    }
  })

export default api;


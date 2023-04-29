export class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = {
      headers: {
        ...config.headers
      }
    };

    this._aboutMeUrl = `https://nomoreparties.co/v1/cohort-64/users/me`;
    this._likesUrl = `/likes`;
  }

  getInitialCards() {
    const response = fetch(this._url, this._headers);

    return this.handleResponse(response);
  }

  createCard(name, link) {
    const response = fetch(this._url, {
      ...this._headers,
      method: 'POST',
      body: JSON.stringify({
        name,
        link
      })
    })

    return this.handleResponse(response);
  }

  deleteCard(cardId) {
    const response = fetch(`${this._url}/${cardId}`, {
      ...this._headers,
      method: 'DELETE',
    });

    return this.handleResponse(response);
  }

  getAboutMe() {
    const response = fetch(this._aboutMeUrl, this._headers);

    return this.handleResponse(response);
  }

  updateAboutMe(name, about) {
    const response = fetch(this._aboutMeUrl, {
      ...this._headers,
      method: 'PATCH',
      body: JSON.stringify({
        name,
        about
      })
    });

    return this.handleResponse(response);
  }

  updateMyAvatar(avatar) {
    const response = fetch(`${this._aboutMeUrl}/avatar`, {
      ...this._headers,
      method: 'PATCH',
      body: JSON.stringify({
        avatar
      })
    });

    return this.handleResponse(response);
  }

  addLike(cardId) {
    const response = fetch(`${this._url}/${cardId}${this._likesUrl}`, {
      ...this._headers,
      method: 'PUT'
    });

    return this.handleResponse(response);
  }

  removeLike(cardId) {
    const response = fetch(`${this._url}/${cardId}${this._likesUrl}`, {
      ...this._headers,
      method: 'DELETE'
    });

    return this.handleResponse(response);
  }

  handleResponse(promise) {
    return promise
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }
}



class ApiService {
  url = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/party';

  token = '495f6f214e31419e19ecb9164a89eccdb96f9aae';

  options = {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Token ${this.token}`,
    },
  };

  async getInfo(query) {
    try {
      console.log(query);
      const result = await fetch(this.url, { ...this.options, body: JSON.stringify({ query }) });
      return await result.json();
    } catch (err) {
      console.log(err);
    }
  }
}

export default new ApiService();

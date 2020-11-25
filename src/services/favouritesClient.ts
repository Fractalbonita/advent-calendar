import Beer from '../components/Beer';

export function adddFavouriteBeerToDb(beer: Beer) {
  fetch(process.env.VUE_APP_BEER_API_URL + '/favourites', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(beer)
  })
    .then(res => res.json())
    .then(data => (beer.id = data.id))
    .catch(error => console.error(error));
}

export function deleteFavouriteBeerFromDb(beer: Beer) {
  fetch(process.env.VUE_APP_BEER_API_URL + '/favourites/' + beer.id, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(beer)
  })
    .then(res => res.json())
    .then(data => (beer.id = data.id))
    .catch(error => console.error(error));
}

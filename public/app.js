const newsContainer = document.getElementById('newsContainer');
const applyFiltersBtn = document.getElementById('applyFilters');

applyFiltersBtn.addEventListener('click', fetchNewsWithFilters);

fetchDefaultNews();

function fetchDefaultNews() {
  const country = 'in';

  const apiUrl = `/api/headlines?country=${country}`;

  fetchNews(apiUrl);
}

function fetchNewsWithFilters() {
  const query = document.getElementById('query').value;
  const country = document.getElementById('country').value;
  const fromDate = document.getElementById('fromDate').value;
  const toDate = document.getElementById('toDate').value;
  const sortBy = document.getElementById('sortBy').value;

  const apiUrl = `/api/headlines?q=${query}&country=${country}&from=${fromDate}&to=${toDate}&sortBy=${sortBy}`;

  fetchNews(apiUrl);
}

// function fetchNews(apiUrl) {
//   fetch(apiUrl)
//     .then(response => response.json())
//     .then(data => {
//       newsContainer.innerHTML = '';

//       data.articles.forEach(article => {
//         const newsDiv = document.createElement('div');
//         newsDiv.classList.add('news');

//         const imageContainer = document.createElement('div');
//         imageContainer.classList.add('image-container');
//         const image = document.createElement('img') ;
//         image.src = article.urlToImage || '1.png';
//         image.alt = article.title;
//         imageContainer.appendChild(image);
//         newsDiv.appendChild(imageContainer);

//         const title = document.createElement('h2');
//         title.textContent = article.title;
//         newsDiv.appendChild(title);

//         const author = document.createElement('p');
//         author.textContent = `Author: ${article.author}`;
//         newsDiv.appendChild(author);

//         // const content = document.createElement('p');
//         // content.textContent = article.content;
//         // newsDiv.appendChild(content);
        
//         const content = document.createElement('p');
//         content.textContent = article.description;
//         newsDiv.appendChild(content);

//         const source = document.createElement('p');
//         source.textContent = `Source: ${article.source.name}`;
//         newsDiv.appendChild(source);

//         newsContainer.appendChild(newsDiv);
//       });
//     })
//     .catch(error => {
//       console.error('Error:', error);
//       // Handle error case
//     });
// }


function fetchNews(apiUrl) {
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      newsContainer.innerHTML = '';

      data.articles.forEach(article => {
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('news');

        const imageContainer = document.createElement('div');
        imageContainer.classList.add('image-container');
        const image = document.createElement('img');
        image.src = article.urlToImage || '1.jpg';
        image.alt = article.title;
        imageContainer.appendChild(image);
        newsDiv.appendChild(imageContainer);

        const content = document.createElement('div');
        content.classList.add('content');
        newsDiv.appendChild(content);

        const title = document.createElement('h2');
        title.textContent = article.title;
        content.appendChild(title);

        const description = document.createElement('p');
        description.textContent = article.description || ''; 
        content.appendChild(description);

        const author = document.createElement('p');
        author.textContent = `Author: ${article.author || 'Unknown'}`;
        newsDiv.appendChild(author);

        const source = document.createElement('p');
        source.textContent = `Source: ${article.source.name}`;
        newsDiv.appendChild(source);

        const readMoreButton = document.createElement('button');
        readMoreButton.classList.add('read-more-button');
        readMoreButton.textContent = 'Read More';
        content.appendChild(readMoreButton);

        readMoreButton.addEventListener('click', () => {
          window.open(article.url, '_blank');
        });

        newsContainer.appendChild(newsDiv);
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });
}
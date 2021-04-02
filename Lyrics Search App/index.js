const form = document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('result');
const more = document.getElementById('more');

const apiURL = 'https://api.lyrics.ovh';

async function searchSongs(searchTerm) {
  const allData = await fetch(`${apiURL}/suggest/${searchTerm}`);

  const data = await allData.json();

  showData(data);
}

function showData(data) {
  result.innerHTML = `
    <ul class="songs">
        ${data.data
          .map(
            (song) => `
             <li>
               <span><strong>${song.artist.name}</strong> -  ${song.title}</span> 
               <button class="btn" data-artist="${song.artist.name}" data-songTitle="${song.title}">Get Lyrics</button>
            </li>
        `
          )
          .join('')}
    </ul>
  `;

  if (data.prev || data.next) {
    more.innerHTML = `
        ${
          data.prev
            ? `<button class="btn" onclick="getMoreSongs('${data.prev}')">Prev</button>`
            : ''
        }
        ${
          data.next
            ? `<button class="btn" onclick="getMoreSongs('${data.next}')">Next</button>`
            : ''
        }
      `;
  } else {
    more.innerHTML = '';
  }
}

async function getMoreSongs(url) {
  const allData = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);

  const data1 = await allData.json();

  showData(data1);
}

async function getLyrics(artist, songTitle) {
  const allData = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);

  const data = await allData.json();

  const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');

  result.innerHTML = `<h2><strong>${artist}</strong> - ${songTitle}</h2>
                      <div class="lyrics"><span>${lyrics}</span></div>
  `;

  more.innerHTML = '';
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const searchTerm = search.value.trim();

  if (!searchTerm) {
    const alert = document.createElement('div');
    alert.classList.add('alert');
    alert.innerText = 'Please Type a Search Term!';
    document.body.appendChild(alert);
    setTimeout(() => alert.remove(), 2000);
  } else {
    search.value = '';
    searchSongs(searchTerm);
  }
});

result.addEventListener('click', (e) => {
  if (e.target.classList.contains('btn')) {
    const artist = e.target.getAttribute('data-artist');
    const songTitle = e.target.getAttribute('data-songTitle');

    getLyrics(artist, songTitle);
  }
});

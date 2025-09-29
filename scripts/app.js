let left_btn = document.getElementsByClassName('bi-chevron-left')[0];
let right_btn = document.getElementsByClassName('bi-chevron-right')[0];
let cards = document.getElementsByClassName('cards')[0];
let search = document.getElementsByClassName('search')[0];
let search_input = document.getElementById('search_input');

// Scroll buttons
left_btn.addEventListener('click', () => {
    cards.scrollLeft -= 140;
});
right_btn.addEventListener('click', () => {
    cards.scrollLeft += 140;
});

let json_url = "db/movie.json";

fetch(json_url)
    .then(response => response.json())
    .then((data) => {
        // Load default cards
        data.forEach(ele => {
            let { id, name, sposter } = ele;
            let card = document.createElement('a');
            card.classList.add('card');
            card.href = `landing-page.html?id=${id}`;
            card.innerHTML = `
                <img src="${sposter}" alt="${name}" class="poster">
                <div class="rest_card"></div>
            `;
            cards.appendChild(card);
        });

        // Set banner info
        document.getElementById('title').textContent = data[0].name;
        document.getElementById('gen').textContent = data[0].genre;
        document.getElementById('date').textContent = data[0].date;
        document.getElementById('rate').innerHTML = `<span>IMDB</span><i class="bi bi-star-fill"></i> ${data[0].imdb}`;

        // Search data preload
        data.forEach(element => {
            let { id, name, imdb, date, sposter, genre } = element;
            let card = document.createElement('a');
            card.classList.add('card');
            card.href = `landing-page.html?id=${id}`;
            card.innerHTML = `
                <img src="${sposter}" alt="">
                <div class="cont">
                    <h3>${name}</h3>
                    <p>${genre} ${date} <span>IMDB</span><i class="bi bi-star-fill"></i> ${imdb}</p>
                </div>
            `;
            search.appendChild(card);
        });

        // Search filter
        search_input.addEventListener('keyup', () => {
            let filter = search_input.value.toUpperCase();
            let a = search.getElementsByTagName('a');
            let hasResult = false;

            for (let index = 0; index < a.length; index++) {
                let b = a[index].getElementsByClassName('cont')[0];
                let textValue = b.textContent || b.innerText;
                if (textValue.toUpperCase().includes(filter)) {
                    a[index].style.display = "flex";
                    hasResult = true;
                } else {
                    a[index].style.display = "none";
                }
            }

            if (filter === "" || !hasResult) {
                search.style.visibility = "hidden";
                search.style.opacity = 0;
            } else {
                search.style.visibility = "visible";
                search.style.opacity = 1;
            }
        });

        // Filter series
        let series = document.getElementById('series');
        series.addEventListener('click', () => {
            cards.innerHTML = '';
            let series_array = data.filter(ele => ele.type === "series");
            series_array.forEach(ele => {
                let { id, name, imdb, date, sposter, bposter, genre } = ele;
                let card = document.createElement('a');
                card.classList.add('card');
                card.href = `landing-page.html?id=${id}`;
                card.innerHTML = `
                    <img src="${sposter}" alt="${name}" class="poster">
                    <div class="rest_card">
                        <img src="${bposter}" alt="">
                        <div class="cont">
                            <h4>${name}</h4>
                            <div class="sub">
                                <p>${genre}, ${date}</p>
                                <h3><span>IMDB</span><i class="bi bi-star-fill"></i> ${imdb}</h3>
                            </div>
                        </div>
                    </div>
                `;
                cards.appendChild(card);
            });
        });

        // Filter movies
        let movies = document.getElementById('movies');
        movies.addEventListener('click', () => {
            cards.innerHTML = '';
            let movie_array = data.filter(ele => ele.type === "movie");
            movie_array.forEach(ele => {
                let { id, name, sposter } = ele;
                let card = document.createElement('a');
                card.classList.add('card');
                card.href = `landing-page.html?id=${id}`;
                card.innerHTML = `<img src="${sposter}" alt="${name}" class="poster">`;
                cards.appendChild(card);
            });
        });

        // Device check
        const isDesktopOrLaptop = () => /Mac|Windows|Linux/i.test(navigator.userAgent);
        if (!isDesktopOrLaptop()) {
            window.location.href = '../src/main/404.html';
        }
    });

// Shortcuts
document.addEventListener('DOMContentLoaded', function () {
    document.addEventListener('keydown', function (event) {
        if (event.key === '/') {
            event.preventDefault();
            search_input.focus();
        }
        if (event.ctrlKey && event.altKey && event.key === 'x') {
            window.location.href = '/testing-features/search.html';
        }
    });
});

// Loader (better approach: hide after page load)
window.addEventListener('load', () => {
    document.querySelector('.loader-wrapper').style.display = 'none';
});

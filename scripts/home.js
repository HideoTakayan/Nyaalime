// DOM elements
const episodeList = document.getElementById('episode-list-ul');
const videoIframe = document.getElementById('video-iframe');

// Get movie ID from URL (?id=...)
const params = new URLSearchParams(window.location.search);
const movieId = parseInt(params.get("id"));

// Construct JSON file path dynamically
const jsonFileUrl = `../db/movie_${movieId}.json`;

// Fetch episode data
fetch(jsonFileUrl)
    .then(response => response.json())
    .then(data => {
        if (!Array.isArray(data) || data.length === 0) {
            console.warn("No episodes found in JSON.");
            return;
        }

        data.forEach((episode, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = episode.name;

            // Click handler for each episode
            listItem.addEventListener('click', () => {
                // Remove highlight from all episodes
                document.querySelectorAll('.episode-list li').forEach(item => {
                    item.classList.remove('playing');
                });

                // Highlight clicked episode
                listItem.classList.add('playing');

                // Update video player
                videoIframe.src = episode.link;
            });

            // Auto-play first episode
            if (index === 0) {
                listItem.classList.add('playing');
                videoIframe.src = episode.link;
            }

            episodeList.appendChild(listItem);
        });
    })
    .catch(error => {
        console.error('Error fetching episode data:', error);
    });

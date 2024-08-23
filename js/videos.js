// Fetch and Display Video List
fetch('./assets/videos.json')
  .then(response => response.json())
  .then(data => {
      const videoList = document.getElementById('videoList');
      data.forEach(video => {
          const li = document.createElement('li');
          li.innerHTML = `<a href="#" data-url="${video.url}">${video.name}</a>`;
          videoList.appendChild(li);
      });
  });

// Handle Video Click and Play Video
document.getElementById('videoList').addEventListener('click', function(e) {
    if (e.target.tagName === 'A') {
        e.preventDefault();
        const videoURL = e.target.getAttribute('data-url');
        document.getElementById('videoPlayer').querySelector('source').src = videoURL;
        document.getElementById('videoPlayer').load();
    }
});

// Handle Video Info Form Submission
const form = document.getElementById('videoInfoForm');
form.addEventListener('submit', function(e) {
    e.preventDefault();
    const data = {
        "video": {
            "name": document.querySelector('#videoPlayer source').src.split('/').pop(),
            "url": document.querySelector('#videoPlayer source').src,
            "title": document.getElementById('title').value,
            "description": document.getElementById('description').value,
            "location": document.getElementById('location').value,
            "date": document.getElementById('date').value,
            "username": auth.currentUser.email,  // Use the logged-in user's email
            "submissionDate": new Date().toISOString()
        }
    };
    fetch('https://api.sheety.co/c298f5e5e40d1a4d113a76de3aea6570/violenceInvestigations/sheet1', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        alert('Submission successful!');
        form.reset();
    })
    .catch(error => {
        alert('An error occurred: ' + error.message);
    });
});

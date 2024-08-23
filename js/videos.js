// Initialize Firebase Auth (assuming Firebase has already been initialized)
const auth = firebase.auth();  // Get Firebase Auth instance

// Ensure user is authenticated before proceeding
const user = auth.currentUser;
if (!user) {
    alert('User not logged in!');
    return;
}

// Fetch and Display Video List
fetch('./assets/videos.json')
  .then(response => response.json())
  .then(data => {
      const videoList = document.getElementById('videoList');
      if (!videoList) {
          console.error("Video list element not found!");
          return;
      }
      data.forEach(video => {
          const li = document.createElement('li');
          li.innerHTML = `<a href="#" data-url="${video.url}">${video.name}</a>`;
          videoList.appendChild(li);
      });
  })
  .catch(error => {
      console.error("Failed to load videos:", error);
  });

// Handle Video Click and Play Video
document.getElementById('videoList').addEventListener('click', function(e) {
    if (e.target.tagName === 'A') {
        e.preventDefault();
        const videoURL = e.target.getAttribute('data-url');
        const videoPlayer = document.getElementById('videoPlayer');
        if (!videoPlayer) {
            console.error("Video player element not found!");
            return;
        }
        videoPlayer.querySelector('source').src = videoURL;
        videoPlayer.load();
    }
});

// Handle Video Info Form Submission
const form = document.getElementById('videoInfoForm');
if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('Submit button clicked');

        const videoSrc = document.querySelector('#videoPlayer source').src;
        if (!videoSrc) {
            alert('Please select a video before submitting!');
            return;
        }

        const data = {
            "video": {
                "name": videoSrc.split('/').pop(),
                "url": videoSrc,
                "title": document.getElementById('title').value,
                "description": document.getElementById('description').value,
                "location": document.getElementById('location').value,
                "date": document.getElementById('date').value,
                "username": auth.currentUser.email,
                "submissionDate": new Date().toISOString()
            }
        };

        console.log("Form data ready for submission:", data);

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
            console.error('An error occurred:', error.message);
            alert('An error occurred: ' + error.message);
        });
    });
} else {
    console.error("Form element not found!");
}

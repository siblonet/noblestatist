document.getElementById('uploadForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const fileInput = document.getElementById('imageFile');
    const file = fileInput.files[0];
    
    if (file) {
      uploadImage(file);
    } else {
      alert('Please select an image file.');
    }
  });
  
  function uploadImage(file) {
    const storageBucket = 'seeme-7a462.appspot.com'; // Replace with your actual Google Cloud Storage bucket name
    const fileName = `image_${Date.now()}_${file.name}`;
    const uploadUrl = `https://storage.googleapis.com/${storageBucket}/${fileName}`;
  
    const formData = new FormData();
    formData.append('file', file);
  
    fetch(uploadUrl, {
      method: 'POST',
      body: formData
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      const uploadedImage = document.getElementById('uploadedImage');
      uploadedImage.src = uploadUrl;
      uploadedImage.style.display = 'block';
    })
    .catch(error => {
      console.error('Error uploading image: ', error);
      alert('Error uploading image. Please try again later.');
    });
  }
  
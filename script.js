$(document).ready(function() {
    const accessKey = 'JAdVroP1TXf_e1xlsJdd_jHqXcccs4L9BMIJ1O4nWVo';
    let currentPhotoIndex = 0;
    let photos = [];

    function fetchPhotos() {
        $.ajax({
            url: 'https://api.unsplash.com/photos',
            headers: {
                'Authorization': 'Client-ID ' + accessKey
            },
            success: function(response) {
                // alert(JSON.stringify(response));
                
                photos = response;
                console.log(response);

                displayPhotos(photos);
            },
            error: function(error) {
                console.error('Error fetching photos:', error);
            }
        });
    }

    function displayPhotos(photos) {
        photos.forEach(function(photo, index) {
            const userProfile = photo.user;
            const imageItem = '<div class="image-item" data-index="' + index + '">' +
                                '<img src="' + photo.urls.small + '" alt="' + (photo.alt_description || 'Unsplash photo') + '">' +
                                '<div class="overlay">' +
                                    '<div class="userdetails">' +
                                        '<img class="profile-pic" src="' + userProfile.profile_image.medium + '" alt="' + userProfile.name + '">' +
                                        '<div class="user-details">' +
                                            '<h4>' + userProfile.name + '</h4>' +
                                            // '<p>' + (userProfile.bio || '') + '</p>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>' +
                                '</div>';
                $('#imgcard').append(imageItem);
        });
    }

    function showphotodetails(index) {
        const photo = photos[index];
        currentPhotoIndex = index;

        $('.modal-image').attr('src', photo.urls.regular);

        const details = '<h3>' + photo.user.name + '</h3>' +
                        '<p>Description: ' + (photo.description || 'No description available') + '</p>' +
                        '<p>Likes: ' + photo.likes + '</p>' +
                        '<p>Date: ' + new Date(photo.created_at).toLocaleDateString() + '</p>';
                        // '<p>Location: ' + (photo.location && photo.location ? photo.location : 'Not available') + '</p>';

        $('#modal-details').html(details);
        $('.modal').fadeIn();
    }

    $('#imgcard').on('click', '.image-item', function() {
        const index = $(this).data('index');
        showphotodetails(index);
    });

    $('.close-button').click(function() {
        $('.modal').fadeOut();
    });

    $('.prev').click(function() {
        if (currentPhotoIndex > 0) {
            showphotodetails(currentPhotoIndex - 1);
        }
    });

    $('.next').click(function() {
        if (currentPhotoIndex < photos.length - 1) {
            showphotodetails(currentPhotoIndex + 1);
        }
    });

    fetchPhotos();
});
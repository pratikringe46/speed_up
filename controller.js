// This is the file that the bookmarklet loads onto the video page.
// It contains the actual logic for controlling video speed.

(function() {
    
    // Check if the script is already running
    if (window.videoSpeedController) {
        window.videoSpeedController.run();
        return;
    }

    // Create a controller object to avoid polluting the global scope
    const controller = {
        videos: [],

        findVideos: function() {
            // Find all <video> elements on the page
            this.videos = document.querySelectorAll('video');
            return this.videos.length > 0;
        },

        setSpeed: function(rate) {
            // Apply the new speed to EVERY video found
            this.videos.forEach(function(video) {
                video.playbackRate = rate;
            });
            console.log('Video speed set to: ' + rate);
        },

        promptForSpeed: function() {
            // Get the speed of the first video to use as a default
            const currentSpeed = this.videos[0] ? this.videos[0].playbackRate : '1.0';
            
            // Ask the user for their desired speed
            const speedInput = prompt('Enter desired playback speed (e.g., 1.5, 2, 0.5):', currentSpeed);

            if (speedInput) {
                const newRate = parseFloat(speedInput);
                
                if (!isNaN(newRate) && newRate > 0) {
                    this.setSpeed(newRate);
                } else {
                    alert('Invalid speed. Please enter a positive number.');
                }
            }
        },
        
        run: function() {
            if (this.findVideos()) {
                this.promptForSpeed();
            } else {
                alert('No HTML5 video found on this page.');
            }
        }
    };

    // Make the controller globally accessible (but namespaced)
    // so the bookmarklet can re-run it without re-injecting
    window.videoSpeedController = controller;
    
    // Run the controller
    window.videoSpeedController.run();

})();
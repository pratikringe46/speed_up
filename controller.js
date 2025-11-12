/**
 * This script is adapted from the velut/videospeedup.com project.
 * It contains specific logic to find the video element on complex sites like YouTube.
 */
(function() {

    function VideoSpeed() {
        this.videos = [];
        this.is_yt = false; // Flag for YouTube

        /**
         * Finds all video elements.
         * Contains a special check for YouTube's new Shadow DOM player.
         */
        this.findVideos = function() {
            this.videos = document.querySelectorAll('video');
            this.is_yt = false;

            // This is the specific fix for YouTube:
            // It looks for a specific attribute that YouTube's player uses.
            if (window.location.hostname.includes('youtube.com') && this.videos.length === 0) {
                var shadow = document.querySelectorAll('[data-youtube-player-shadow-internal]');
                if (shadow.length > 0) {
                    this.videos = shadow[0].shadowRoot.querySelectorAll('video');
                    this.is_yt = true;
                }
            }
            return this.videos.length > 0;
        };

        /**
         * Gets the current speed.
         */
        this.getSpeed = function() {
            if (this.videos.length > 0) {
                return this.videos[0].playbackRate;
            }
            return 1; // Default
        };

        /**
         * Sets the speed for all found videos.
         */
        this.setSpeed = function(rate) {
            if (rate > 0) {
                this.videos.forEach(function(video) {
                    video.playbackRate = rate;
                });
            } else {
                alert('Invalid speed. Please enter a positive number.');
            }
        };

        /**
         * The main function that runs when called.
         */
        this.run = function() {
            if (!this.findVideos()) {
                alert('No HTML5 video found on this page.');
                return;
            }

            var currentSpeed = this.getSpeed();
            var newSpeed = prompt('Enter desired playback speed:', currentSpeed);

            if (newSpeed) {
                this.setSpeed(parseFloat(newSpeed));
            }
        };

        /**
         * Initializes the controller.
         */
        this.init = function() {
            this.run();
        };
    }

    // --- Script Execution ---

    // Check if the controller is already loaded on the page
    if (typeof(window.videoSpeedController) === 'undefined') {
        window.videoSpeedController = new VideoSpeed();
    }
    
    // Run the controller
    window.videoSpeedController.init();

})();

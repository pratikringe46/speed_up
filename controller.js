// This is a much more advanced controller script that can
// search inside iframes and Shadow DOMs (which YouTube uses).

(function() {
    
    // Check if the controller is already on the page
    if (window.videoSpeedController) {
        window.videoSpeedController.run();
        return;
    }

    const controller = {
        videos: [], // This will hold all found video elements

        /**
         * Recursively finds all video elements, searching in the main document,
         * inside iframes, and inside Shadow DOMs.
         */
        findVideos: function() {
            let videosList = [];
            
            function recursiveSearch(doc) {
                if (!doc) return;

                // 1. Find videos in the current document
                doc.querySelectorAll('video').forEach(video => {
                    videosList.push(video);
                });

                // 2. Search inside all iframes in this document
                try {
                    doc.querySelectorAll('iframe').forEach(iframe => {
                        recursiveSearch(iframe.contentDocument);
                    });
                } catch (e) {
                    // Cross-origin iframe security will block access, this is normal
                    // console.log('Could not access iframe: ', e.message);
                }
                
                // 3. Search inside all Shadow DOMs in this document
                doc.querySelectorAll('*').forEach(el => {
                    if (el.shadowRoot) {
                        recursiveSearch(el.shadowRoot);
                    }
                });
            }

            // Start the search from the main document
            recursiveSearch(document);
            this.videos = videosList;
            return this.videos.length > 0;
        },

        setSpeed: function(rate) {
            if (this.videos.length === 0) {
                console.warn('VideoSpeedController: No videos found to set speed.');
                return;
            }
            this.videos.forEach(function(video) {
                video.playbackRate = rate;
            });
            console.log('Video speed set to: ' + rate);
        },

        promptForSpeed: function() {
            // Get speed from the first video, or default to 1.0
            const currentSpeed = (this.videos[0] && this.videos[0].playbackRate) ? this.videos[0].playbackRate : '1.0';
            
            const speedInput = prompt('Enter desired playback speed:', currentSpeed);

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

    // Make the controller globally accessible so the bookmarklet
    // can re-run it without re-injecting the whole script.
    window.videoSpeedController = controller;
    
    // Run the controller for the first time
    window.videoSpeedController.run();

})();

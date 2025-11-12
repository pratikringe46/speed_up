document.addEventListener('DOMContentLoaded', function() {
    
    // !!! --- YOU MUST CHANGE THIS --- !!!
    // Change this to the URL where you will host your files.
    // For example, if using GitHub Pages, it might be:
    // 'https://your-username.github.io/your-repo-name'
    // NO TRAILING SLASH /
    const YOUR_HOSTED_URL = 'https://pratikringe46.github.io/speed_up/';


    // This is the URL to the *actual* script that will run on YouTube.
    // We add a random number ('+Date.now()') to prevent caching issues.
    const scriptUrl = `${YOUR_HOSTED_URL}/controller.js?v=` + Date.now();

    // This is the tiny code that will live inside the bookmarklet.
    // It injects your 'controller.js' script onto the page.
    const bookmarkletCode = `
    (function() {
        var script = document.createElement('script');
        script.src = '${scriptUrl}';
        document.body.appendChild(script);
    })();
    `;

    // Minify the code to fit into the 'href' attribute
    const minifiedCode = bookmarkletCode.replace(/(\r\n|\n|\r|\s\s+)/gm, '');

    // Set the link's href to the minified bookmarklet code
    const bookmarkletLink = document.getElementById('bookmarkletLink');
    bookmarkletLink.href = 'javascript:' + minifiedCode;

    // Add a helper alert to prevent users from just clicking the link
    bookmarkletLink.onclick = function() {
        alert('DO NOT CLICK this button.\n\nDRAG it to your Bookmarks Bar.');
        return false;
    };

});


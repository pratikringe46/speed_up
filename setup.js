// This is the new, complete setup file.
// It does not depend on any other files.

document.addEventListener('DOMContentLoaded', function() {
    
    /**
     * This is the complete, self-contained bookmarklet code.
     * It combines YOUR request for a "prompt" with the working
     * "MutationObserver" logic from the 'velut' project.
     */
    const bookmarkletCode = `(function(){let d=document,w=window;const c=(w.__vss||1).toString(),s=prompt("Enter desired playback speed:",c);if(!s)return;const r=parseFloat(s);if(isNaN(r)||r<=0){alert("Invalid speed.");return}w.__vss=r;let e=o=>{d.querySelectorAll("video,audio").forEach(t=>{t.playbackRate=w.__vss})};let n=()=>{w.__vso=w.__vso||new MutationObserver(()=>{e(!0)}),w.__vsa||(()=>{let o=d.querySelector("body");o&&(w.__vso.observe(o,{subtree:!0,childList:!0}),w.__vsa=!0)})()};n(),e()})();`;

    // Find the link element on our page...
    const bookmarkletLink = document.getElementById('bookmarkletLink');
    
    // ...and set its href attribute to the new, all-in-one code.
    bookmarkletLink.href = 'javascript:' + bookmarkletCode;

    // Add helper 'onclick' to prevent confusion
    bookmarkletLink.onclick = function() {
        alert('DO NOT CLICK this button.\n\nDRAG it to your Bookmarks Bar.');
        return false; 
    };
});

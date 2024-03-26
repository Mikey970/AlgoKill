(function() {
  const observeDOM = (function(){
      const MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
      return function(obj, callback){
          if( !obj || obj.nodeType !== 1) return; // Ensure the object is a DOM element
          
          if( MutationObserver ){
              // Define a new observer
              const mutationObserver = new MutationObserver(callback);
              // Observe the object for DOM changes
              mutationObserver.observe(obj, { childList:true, subtree:true });
              return mutationObserver;
          }
          // Fallback for older browsers
          else if( window.addEventListener ){
              obj.addEventListener('DOMSubtreeModified', callback, false);
          }
      }
  })();

  // Function to modify the search query if needed
  function modifySearchQueryIfNeeded() {
      const searchInput = document.querySelector('input[name="search_query"]');
      if(searchInput && !searchInput.value.includes('before:2025')) {
          searchInput.value += ' before:2025';
          const form = document.querySelector('form');
          form && form.submit(); // Programmatically submit the form
          
      }
  }

  // Observe the body for changes and set up event listeners on the search input
  observeDOM(document.body, function(){
      const searchInput = document.querySelector('input[name="search_query"]');
      const searchButton = document.querySelector('button#search-icon-legacy');

      searchButton.addEventListener('click', modifySearchQueryIfNeeded)
      if (searchInput) {
          // Modify the search query when enter is pressed
          searchInput.addEventListener('keydown', function(e) {
              if (e.key === 'Enter') {
                  modifySearchQueryIfNeeded();
              }
          });
      }
  });
})();

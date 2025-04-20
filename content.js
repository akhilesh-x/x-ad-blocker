// Global variable to store the setting
let showPlaceholder = true; // Default to true

// Function to create the placeholder element with a 'Show' button
function createPlaceholder(originalArticle, isHidden = true) { // Accept the original article and its state
  const placeholder = document.createElement('div');
  placeholder.style.padding = '10px';
  placeholder.style.border = '1px dashed #ccc';
  placeholder.style.color = '#888';
  placeholder.style.fontSize = '12px';
  placeholder.style.margin = '10px 0';
  placeholder.style.textAlign = 'center';
  placeholder.style.display = 'flex'; // Use flexbox for layout
  placeholder.style.justifyContent = 'space-between';
  placeholder.style.alignItems = 'center';

  const textSpan = document.createElement('span');
  
  // Button for showing or hiding
  const actionButton = document.createElement('button');
  actionButton.style.marginLeft = '10px';
  actionButton.style.padding = '2px 8px';
  actionButton.style.fontSize = '11px';
  actionButton.style.cursor = 'pointer';
  actionButton.style.border = '1px solid #ccc';
  actionButton.style.backgroundColor = '#f0f0f0';
  actionButton.style.borderRadius = '3px';

  if (isHidden) {
    // Show button for hidden ad
    textSpan.textContent = 'Ad hidden by X Ad Blocker';
    actionButton.textContent = 'Show';
    
    // Add click event listener to show the ad
    actionButton.addEventListener('click', (event) => {
      event.stopPropagation(); // Prevent triggering other listeners if any
      if (originalArticle) {
        originalArticle.style.display = ''; // Reset display to show the article
        originalArticle.dataset.adProcessed = 'visible_ad'; // Mark it as visible
        
        // Create a new placeholder with hide button and place it ABOVE the ad
        const newPlaceholder = createPlaceholder(originalArticle, false);
        originalArticle.parentNode.insertBefore(newPlaceholder, originalArticle);
      }
      placeholder.remove(); // Remove this placeholder
      console.log('Ad revealed with hide option added above.');
    });
  } else {
    // Hide button for visible ad
    textSpan.textContent = 'Ad shown (click to hide again)';
    actionButton.textContent = 'Hide';
    
    // Add click event listener to hide the ad
    actionButton.addEventListener('click', (event) => {
      event.stopPropagation();
      if (originalArticle) {
        originalArticle.style.display = 'none'; // Hide again
        originalArticle.dataset.adProcessed = 'true'; // Mark as processed (hidden)
        
        // Create a new placeholder with show button (placeholder is already above the ad)
        const newPlaceholder = createPlaceholder(originalArticle, true);
        originalArticle.parentNode.insertBefore(newPlaceholder, originalArticle);
      }
      placeholder.remove(); // Remove this placeholder
      console.log('Ad hidden again.');
    });
  }

  placeholder.appendChild(textSpan);
  placeholder.appendChild(actionButton);

  return placeholder;
}

// Function to find and hide/replace ads
function hideAds() {
  // Select all potential tweet/post articles
  const articles = document.querySelectorAll('article[role="article"]');

  articles.forEach(article => {
    // Check if this article has already been processed OR is an ad we made visible
    if (article.dataset.adProcessed === 'true' || article.dataset.adProcessed === 'visible_ad') {
      return; // Skip already processed or revealed ads
    }

    // Search for the specific 'Ad' text span within this article
    const spans = article.querySelectorAll('span');
    let isAd = false;
    for (let span of spans) {
      if (span.textContent.trim() === 'Ad' && !span.closest('a') && !span.closest('button')) {
         const parentDiv = span.closest('div');
         if (parentDiv && parentDiv.className.includes('css-146c3p1')) { // Class observed in user's HTML
             isAd = true;
             break;
         }
      }
    }

    if (isAd) {
      console.log('Found ad article:', article);

      if (showPlaceholder) {
        // Create and insert placeholder, then hide original ad
        const placeholder = createPlaceholder(article, true); // Pass the article and specify it's hidden
        article.parentNode.insertBefore(placeholder, article);
        article.style.display = 'none';
        article.dataset.adProcessed = 'true'; // Mark as processed (hidden)
        console.log('Replaced ad with placeholder');
      } else {
        // Just hide the ad
        article.style.display = 'none';
        article.dataset.adProcessed = 'true'; // Mark as processed (hidden)
        console.log('Hid ad');
      }
    }
  });
}

// --- Initialization and Observation ---

// Function to load settings and start observer
function initialize() {
  chrome.storage.sync.get(['showPlaceholder'], function(result) {
    // If setting doesn't exist, default to true (result.showPlaceholder will be undefined)
    if (result.showPlaceholder === undefined) {
      // Set the default in storage
      chrome.storage.sync.set({showPlaceholder: true}, function() {
        console.log('X Ad Blocker: Default setting saved (showPlaceholder: true)');
      });
      showPlaceholder = true;
    } else {
      showPlaceholder = !!result.showPlaceholder;
    }
    console.log('X Ad Blocker: Initial setting loaded - showPlaceholder:', showPlaceholder);

    // Run initially
    hideAds();

    // Observe changes in the DOM
    const observer = new MutationObserver((mutations) => {
      hideAds();
    });

    // Start observing the document body
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    console.log('X Ad Blocker: Observer started.');
  });
}

// Listen for changes in storage (e.g., when popup setting changes)
chrome.storage.onChanged.addListener(function(changes, namespace) {
  if (namespace === 'sync' && changes.showPlaceholder) {
    const newValue = !!changes.showPlaceholder.newValue;
    if (showPlaceholder !== newValue) {
        showPlaceholder = newValue;
        console.log('X Ad Blocker: Setting changed - showPlaceholder:', showPlaceholder);
        // This setting change currently only affects *newly loaded* ads.
        // Applying it retroactively would require finding all placeholders/hidden ads
        // and changing them, which adds complexity.
    }
  }
});

// Start the process
initialize();

console.log('X Ad Blocker content script loaded and initialized.'); 
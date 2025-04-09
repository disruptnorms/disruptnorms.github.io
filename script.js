document.addEventListener('DOMContentLoaded', function () {
  // Header scroll effect
  const header = document.querySelector('header');
  window.addEventListener('scroll', function () {
    header.classList.toggle('scrolled', window.scrollY > 50);
  });

  // Mobile navigation toggle
  const mobileNavToggle = document.getElementById('mobile-nav-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  const navLinks = document.querySelectorAll('.nav-link');

  mobileNavToggle.addEventListener('click', function () {
    mobileNav.classList.toggle('show');
    const icon = mobileNavToggle.querySelector('i');
    icon.className = mobileNav.classList.contains('show') ? 'fas fa-times' : 'fas fa-bars';
  });

  navLinks.forEach(link => {
    link.addEventListener('click', function () {
      mobileNav.classList.remove('show');
      mobileNavToggle.querySelector('i').className = 'fas fa-bars';
    });
  });

  // Gallery filtering
  const galleryFilters = document.querySelectorAll('.gallery-filter');
  const galleryItems = document.querySelectorAll('.gallery-item');

  galleryFilters.forEach(filter => {
    filter.addEventListener('click', function () {
      galleryFilters.forEach(f => f.classList.remove('active'));
      this.classList.add('active');
      const filterValue = this.getAttribute('data-filter');

      galleryItems.forEach(item => {
        item.style.display =
          filterValue === 'all' || item.getAttribute('data-category') === filterValue
            ? 'block'
            : 'none';
      });
    });
  });

  // Form submission handling
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const formGroups = document.querySelectorAll('.form-group');
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      formGroups.forEach(group => (group.style.display = 'none'));
      submitBtn.style.display = 'none';

      const successMessage = document.createElement('div');
      successMessage.className = 'success-message';
      successMessage.innerHTML = `
        <i class="fas fa-check-circle" style="color: var(--success); font-size: 3rem; margin-bottom: 1rem;"></i>
        <h3>Thank you, ${name}!</h3>
        <p>Your message has been sent successfully. I'll get back to you as soon as possible.</p>
      `;
      successMessage.style.textAlign = 'center';
      successMessage.style.padding = '2rem 0';
      contactForm.appendChild(successMessage);
      contactForm.reset();
    });
  }

  // Load Medium posts
  loadMediumPosts();

  // Load Bluesky posts
  loadBlueskyPosts();
});

async function loadMediumPosts() {
  const mediumUser = 'stephensmw';
  const rssUrl = `https://medium.com/feed/@${mediumUser}`;
  const rssToJsonServiceUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;

  try {
    const response = await fetch(rssToJsonServiceUrl);
    const data = await response.json();

    if (data.status === 'ok') {
      const placeholder = document.querySelector('.blog-placeholder');
      if (placeholder) placeholder.remove();

      const posts = data.items.slice(0, 3);
      const mediumPostsContainer = document.getElementById('medium-posts');

      posts.forEach(post => {
        const imgMatch = post.content.match(/<img[^>]+src="([^"]+)"/);
        const imgSrc = imgMatch ? imgMatch[1] : null;

        const div = document.createElement('div');
        div.innerHTML = post.content;
        const excerpt = div.textContent.slice(0, 120) + '...';

        const postElement = document.createElement('div');
        postElement.className = 'blog-card';
        postElement.innerHTML = `
          <div class="blog-image">
            ${imgSrc ? `<img src="${imgSrc}" alt="${post.title}">` : `
            <div class="image-placeholder">
              <i class="fas fa-newspaper"></i>
              <span>Blog Thumbnail</span>
            </div>`}
          </div>
          <div class="blog-content">
            <div class="blog-meta">${new Date(post.pubDate).toLocaleDateString()} · Medium</div>
            <h3 class="blog-title">${post.title}</h3>
            <p class="blog-excerpt">${excerpt}</p>
            <a href="${post.link}" class="blog-link" target="_blank">Read on Medium →</a>
          </div>
        `;
        mediumPostsContainer.appendChild(postElement);
      });
    }
  } catch (error) {
    console.error('Error loading Medium posts:', error);
  }
}

// Create gallery viewer
function createGalleryViewer() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  galleryItems.forEach(item => {
    item.addEventListener('click', function () {
      console.log('Gallery item clicked:', this.querySelector('h4')?.textContent);
    });
  });
}
window.addEventListener('load', createGalleryViewer);

// Bluesky post loader
async function loadBlueskyPosts() {
  const handle = 'disruptnorms.com';
  const feedContainer = document.getElementById('bsky-feed-grid');

  try {
    const didRes = await fetch(`https://bsky.social/xrpc/com.atproto.identity.resolveHandle?handle=${handle}`);
    const didData = await didRes.json();
    const did = didData.did;

    const feedRes = await fetch(`https://bsky.social/xrpc/app.bsky.feed.getAuthorFeed?actor=${did}&limit=5`);
    const feedData = await feedRes.json();

    feedContainer.innerHTML = '';

    feedData.feed.forEach(item => {
      const post = item.post.record;
      const embed = item.post.embed?.images || [];
      const timestamp = new Date(post.createdAt).toLocaleString();

      const postElement = document.createElement('div');
      postElement.className = 'gallery-item';
      postElement.innerHTML = `
        <div class="image-placeholder">
          <span>${post.text.slice(0, 100)}...</span>
        </div>
        <div class="gallery-item-overlay">
          <h4>@${handle}</h4>
          <p>${timestamp}</p>
        </div>
      `;

      if (embed.length > 0) {
        const img = document.createElement('img');
        img.src = embed[0].thumb;
        img.alt = 'Post Image';
        img.style.width = '100%';
        img.style.borderRadius = '8px';
        postElement.prepend(img);
      }

      feedContainer.appendChild(postElement);
    });
  } catch (err) {
    console.error('Failed to load Bluesky feed:', err);
    feedContainer.innerHTML = '<p style="text-align:center;color:var(--text-muted);">Unable to load Bluesky posts at this time.</p>';
  }
}

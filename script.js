document.addEventListener('DOMContentLoaded', function() {
    // Header scroll effect
    const header = document.querySelector('header');
    const mobileNavToggle = document.getElementById('mobile-nav-toggle');
    const mobileNav = document.getElementById('mobile-nav');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Mobile navigation toggle
    mobileNavToggle.addEventListener('click', function() {
        mobileNav.classList.toggle('show');
        const icon = mobileNavToggle.querySelector('i');
        if (mobileNav.classList.contains('show')) {
            icon.className = 'fas fa-times';
        } else {
            icon.className = 'fas fa-bars';
        }
    });
    
    // Close mobile nav when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileNav.classList.remove('show');
            mobileNavToggle.querySelector('i').className = 'fas fa-bars';
        });
    });
    
    // Gallery filtering
    const galleryFilters = document.querySelectorAll('.gallery-filter');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            // Update active filter
            galleryFilters.forEach(f => f.classList.remove('active'));
            this.classList.add('active');
            
            // Filter gallery items
            const filterValue = this.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Form submission handling
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In a real implementation, you would send the form data to a server
            // For this demo, we'll just simulate a successful submission
            
            const name = document.getElementById('name').value;
            
            // Create success message
            const formGroups = document.querySelectorAll('.form-group');
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            
            // Hide form elements
            formGroups.forEach(group => group.style.display = 'none');
            submitBtn.style.display = 'none';
            
            // Show success message
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
            
            // Reset form (but don't show it yet)
            contactForm.reset();
        });
    }
    //New Medium Code
    // More robust Medium integration using a proxy service
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
      
      const posts = data.items.slice(0, 3); // Get the latest 3 posts
      const mediumPostsContainer = document.getElementById('medium-posts');
      
      posts.forEach(post => {
        // Extract first image from content if available
        const imgRegex = /<img[^>]+src="([^">]+)"/;
        const imgMatch = post.content.match(imgRegex);
        const imgSrc = imgMatch ? imgMatch[1] : null;
        
        // Create excerpt from content (strip HTML and limit length)
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
    // Display error message...
  }
}
    // Load Medium posts
    loadMediumPosts();
});

// Function to fetch and display Medium posts
async function loadMediumPosts() {
    const mediumUser = 'stephensmw';
    const mediumPostsContainer = document.getElementById('medium-posts');
    
    try {
        // In a real implementation, you would use Medium's API or a service like RSS2JSON
        // For this demo, we'll just create placeholder posts
        // Remove the placeholder loading indicator
        const placeholder = document.querySelector('.blog-placeholder');
        if (placeholder) {
            placeholder.remove();
        }
        
        // Create sample blog posts
        const samplePosts = [
            {
                title: "The Social Construction of Reality in Digital Spaces",
                excerpt: "Examining how online communities develop their own norms, rituals, and belief systems that shape participants' perception of reality.",
                date: "April 2, 2025",
                thumbnail: null
            },
            {
                title: "Disrupting Cultural Paradigms: A Case Study on Alternative Family Structures",
                excerpt: "This research challenges conventional definitions of family by exploring various alternative structures emerging in modern society.",
                date: "March 15, 2025",
                thumbnail: null
            },
            {
                title: "The Sociology of Technological Adoption: Why Some Innovations Fail",
                excerpt: "Analyzing the social factors that determine whether a new technology becomes mainstream or disappears into obscurity.",
                date: "February 24, 2025",
                thumbnail: null
            }
        ];
        
        // Add posts to the container
        samplePosts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.className = 'blog-card';
            
            postElement.innerHTML = `
                <div class="blog-image">
                    <div class="image-placeholder">
                        <i class="fas fa-newspaper"></i>
                        <span>Blog Thumbnail</span>
                    </div>
                </div>
                <div class="blog-content">
                    <div class="blog-meta">${post.date} · Medium</div>
                    <h3 class="blog-title">${post.title}</h3>
                    <p class="blog-excerpt">${post.excerpt}</p>
                    <a href="https://medium.com/@${mediumUser}" class="blog-link" target="_blank">Read on Medium →</a>
                </div>
            `;
            
            mediumPostsContainer.appendChild(postElement);
        });
        
    } catch (error) {
        console.error('Error loading Medium posts:', error);
        
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.innerHTML = `
            <p>Unable to load blog posts at this time. Please visit my <a href="https://medium.com/@${mediumUser}" target="_blank">Medium profile</a> to read my latest articles.</p>
        `;
        
        mediumPostsContainer.innerHTML = '';
        mediumPostsContainer.appendChild(errorMessage);
    }
}

// Function to create a lightweight gallery viewer
function createGalleryViewer() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            // In a real implementation, this would open a lightbox view of the image/video
            // For this demo, we'll just log it
            console.log('Gallery item clicked:', this.querySelector('h4').textContent);
        });
    });
}

// Call gallery viewer setup when content loads
window.addEventListener('load', createGalleryViewer);

function loadGallery() {
  // Gallery categories and their images
  const galleryData = {
    fieldwork: [
      { src: 'gallery/fieldwork/image1.jpg', title: 'Field Research in Location A', description: 'Description of this image' },
      { src: 'gallery/fieldwork/image2.jpg', title: 'Field Research in Location B', description: 'Description of this image' }
      // Add more items
    ],
    travel: [
      { src: 'gallery/travel/image1.jpg', title: 'Travel to Location C', description: 'Description of this image' },
      { src: 'gallery/travel/video1.mp4', title: 'Travel Video', description: 'Description of this video', isVideo: true }
      // Add more items
    ],
    conferences: [
      { src: 'gallery/conferences/image1.jpg', title: 'Conference X', description: 'Description of this image' }
      // Add more items
    ]
  };
  
  const galleryGrid = document.getElementById('gallery-grid');
  galleryGrid.innerHTML = '';
  
  // Combine all categories for 'all' filter
  const allItems = [];
  Object.values(galleryData).forEach(category => allItems.push(...category));
  
  // Add all items to the gallery
  allItems.forEach(item => {
    const galleryItem = document.createElement('div');
    galleryItem.className = 'gallery-item';
    galleryItem.setAttribute('data-category', item.category);
    
    if (item.isVideo) {
      galleryItem.innerHTML = `
        <video src="${item.src}" poster="gallery/thumbnails/${item.src.split('/').pop().replace('.mp4', '.jpg')}" controls></video>
        <div class="gallery-item-overlay">
          <h4>${item.title}</h4>
          <p>${item.description}</p>
        </div>
      `;
    } else {
      galleryItem.innerHTML = `
        <img src="${item.src}" alt="${item.title}">
        <div class="gallery-item-overlay">
          <h4>${item.title}</h4>
          <p>${item.description}</p>
        </div>
      `;
    }
    
    galleryGrid.appendChild(galleryItem);
  });
  
  // Implement lightbox functionality
  implementLightbox();
}

function implementLightbox() {
  // Add lightbox container to the body
  const lightboxContainer = document.createElement('div');
  lightboxContainer.className = 'lightbox-container';
  lightboxContainer.style.display = 'none';
  lightboxContainer.innerHTML = `
    <div class="lightbox-overlay"></div>
    <div class="lightbox-content">
      <button class="lightbox-close">&times;</button>
      <div class="lightbox-media-container"></div>
      <div class="lightbox-caption"></div>
    </div>
  `;
  document.body.appendChild(lightboxContainer);
  
  // Add lightbox styles
  const style = document.createElement('style');
  style.textContent = `
    .lightbox-container { position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 1000; }
    .lightbox-overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.9); }
    .lightbox-content { position: relative; width: 80%; max-width: 1000px; margin: 40px auto; z-index: 1001; }
    .lightbox-close { position: absolute; top: -40px; right: 0; background: none; border: none; color: white; font-size: 30px; cursor: pointer; }
    .lightbox-media-container { background: black; display: flex; justify-content: center; align-items: center; }
    .lightbox-media-container img, .lightbox-media-container video { max-width: 100%; max-height: 80vh; }
    .lightbox-caption { padding: 15px; background: rgba(0,0,0,0.7); color: white; }
  `;
  document.head.appendChild(style);
  
  // Add click handlers to gallery items
  const galleryItems = document.querySelectorAll('.gallery-item');
  galleryItems.forEach(item => {
    item.addEventListener('click', function() {
      const mediaElement = this.querySelector('img') || this.querySelector('video');
      const caption = this.querySelector('.gallery-item-overlay').innerHTML;
      
      const lightboxContainer = document.querySelector('.lightbox-container');
      const mediaContainer = lightboxContainer.querySelector('.lightbox-media-container');
      const captionContainer = lightboxContainer.querySelector('.lightbox-caption');
      
      mediaContainer.innerHTML = '';
      if (this.querySelector('video')) {
        const video = document.createElement('video');
        video.src = this.querySelector('video').src;
        video.controls = true;
        mediaContainer.appendChild(video);
      } else {
        const img = document.createElement('img');
        img.src = this.querySelector('img').src;
        mediaContainer.appendChild(img);
      }
      
      captionContainer.innerHTML = caption;
      lightboxContainer.style.display = 'block';
    });
  });
  
  // Close lightbox on button click
  document.querySelector('.lightbox-close').addEventListener('click', function() {
    document.querySelector('.lightbox-container').style.display = 'none';
  });
  
  // Close lightbox on overlay click
  document.querySelector('.lightbox-overlay').addEventListener('click', function() {
    document.querySelector('.lightbox-container').style.display = 'none';
  });
}


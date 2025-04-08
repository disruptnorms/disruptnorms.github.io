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

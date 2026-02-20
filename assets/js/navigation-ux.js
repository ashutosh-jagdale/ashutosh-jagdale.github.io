/**
 * Navigation & UX Features
 * - Scroll Progress Bar
 * - Sticky Navigation with Active Section Detection
 * - Back-to-Top Floating Button
 */

document.addEventListener('DOMContentLoaded', function() {
	const progressBar = document.getElementById('scrollProgressBar');
	const stickyNav = document.getElementById('stickyNav');
	const backToTopBtn = document.getElementById('backToTopBtn');
	const navLinks = document.querySelectorAll('.sticky-nav-link');
	
	// Section IDs - corresponds to article section IDs in HTML
	const sections = ['intro', 'education', 'work', 'projects', 'skills'];
	
	// Threshold to show sticky navigation (pixels from top)
	const STICKY_NAV_THRESHOLD = 300;
	
	// Scroll event handler
	function handleScroll() {
		const scrollTop = window.scrollY || document.documentElement.scrollTop;
		const docHeight = document.documentElement.scrollHeight - window.innerHeight;
		const scrollPercent = (scrollTop / docHeight) * 100;
		
		// Update progress bar
		if (progressBar) {
			progressBar.style.width = scrollPercent + '%';
		}
		
		// Toggle sticky navigation visibility
		if (scrollTop > STICKY_NAV_THRESHOLD) {
			stickyNav.classList.add('visible');
		} else {
			stickyNav.classList.remove('visible');
		}
		
		// Update active navigation link based on current section
		updateActiveSection();
		
		// Toggle back-to-top button visibility
		if (scrollTop > 300) {
			backToTopBtn.classList.add('visible');
		} else {
			backToTopBtn.classList.remove('visible');
		}
	}
	
	// Determine which section is currently in view
	function updateActiveSection() {
		let activeSection = null;
		
		for (let section of sections) {
			const element = document.getElementById(section);
			if (element) {
				const rect = element.getBoundingClientRect();
				// Check if section is in the upper half of viewport
				if (rect.top <= window.innerHeight / 2) {
					activeSection = section;
				}
			}
		}
		
		// Update nav link styles
		navLinks.forEach(link => {
			const section = link.getAttribute('data-section');
			if (section === activeSection) {
				link.classList.add('active');
			} else {
				link.classList.remove('active');
			}
		});
	}
	
	// Smooth scroll to section and update active
	navLinks.forEach(link => {
		link.addEventListener('click', function(e) {
			e.preventDefault();
			const section = this.getAttribute('data-section');
			const element = document.getElementById(section);
			
			if (element) {
				element.scrollIntoView({ behavior: 'smooth', block: 'start' });
				// Update active immediately
				setTimeout(updateActiveSection, 100);
			}
		});
	});
	
	// Back-to-top button functionality
	backToTopBtn.addEventListener('click', function() {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	});
	
	// Add initial scroll listener
	window.addEventListener('scroll', handleScroll, { passive: true });
	
	// Call once on load to initialize state
	handleScroll();
});

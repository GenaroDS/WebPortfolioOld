/*
	Strata by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function ($) {

	var $window = $(window),
		$body = $('body'),
		$header = $('#header'),
		$footer = $('#footer'),
		$main = $('#main'),
		settings = {

			// Parallax background effect?
			parallax: true,


			// "Parallax factor (lower = more intense, higher = less intense).
			parallaxFactor: 20

		};

	// Breakpoints.
	breakpoints({
		xlarge: ['1281px', '1800px'],
		large: ['981px', '1280px'],
		medium: ['737px', '980px'],
		small: ['481px', '736px'],
		xsmall: [null, '480px'],
	});

	// Play initial animations on page load.
	$window.on('load', function () {
		window.setTimeout(function () {
			$body.removeClass('is-preload');
		}, 100);
	});

	// Touch?
	if (browser.mobile) {

		// Turn on touch mode.
		$body.addClass('is-touch');

		// Height fix (mostly for iOS).
		window.setTimeout(function () {
			$window.scrollTop($window.scrollTop() + 1);
		}, 0);

	}

	// Footer.
	breakpoints.on('<=medium', function () {
		$footer.insertAfter($main);
	});

	breakpoints.on('>medium', function () {
		$footer.appendTo($header);
	});

	// Header.

	// Parallax background.

	// Disable parallax on IE (smooth scrolling is jerky), and on mobile platforms (= better performance).
	if (browser.name == 'ie'
		|| browser.mobile)
		settings.parallax = false;

	if (settings.parallax) {

		breakpoints.on('<=medium', function () {

			$window.off('scroll.strata_parallax');
			$header.css('background-position', '');

		});

		breakpoints.on('>medium', function () {

			$header.css('background-position', 'left 0px');

			$window.on('scroll.strata_parallax', function () {
				$header.css('background-position', 'left ' + (-1 * (parseInt($window.scrollTop()) / settings.parallaxFactor)) + 'px');
			});

		});

		$window.on('load', function () {
			$window.triggerHandler('scroll');
		});

	}

	// Main Sections: Two.

	// Lightbox gallery.
	$window.on('load', function () {
		$('#two').poptrox({
			caption: function ($a) {
				let repoUrl = $a.attr('data-url');
				let captionText = $a.next('h3').text();
				return '<a href="' + repoUrl + '" target="_blank" class="button">' + "Open on GitHub" + '</a>';
			},

			overlayColor: '#2c2c2c',
			overlayOpacity: 0.85,
			popupCloserText: '',
			popupLoaderText: '',
			selector: '.work-item a.image',
			usePopupCaption: true,
			usePopupDefaultStyling: false,
			usePopupEasyClose: false,
			usePopupNav: true,
			windowMargin: (breakpoints.active('<=small') ? 0 : 50)
		});
	});

	//Drop down button

})(jQuery);

document.querySelector(".dropdown-btn").addEventListener("click", function (event) {
	event.stopPropagation(); // Prevent the click event from bubbling up to the document
	const content = document.querySelector(".dropdown-content");
	content.style.display = content.style.display === "block" ? "none" : "block";
});

document.addEventListener("click", function () {
	const content = document.querySelector(".dropdown-content");
	content.style.display = "none";
});

document.querySelector(".dropdown-btn").addEventListener("click", function (event) {
	event.stopPropagation();
	const content = document.querySelector(".dropdown-content");
	content.classList.toggle("show");
});




// Smoother animation to my dropdownlist
document.querySelectorAll(".dropdown-content a").forEach(function (link) {
	link.addEventListener("click", function (event) {
		event.preventDefault();
		const targetId = event.currentTarget.getAttribute("href");
		const targetElement = document.querySelector(targetId);

		// Smooth scrolling using the scrollTo method
		window.scrollTo({
			top: targetElement.offsetTop,
			behavior: "smooth"
		});

		// Close the dropdown after clicking the navigation link
		const content = document.querySelector(".dropdown-content");
		content.classList.remove("show");
	});
});


// Clipboard scripts

function copyEmailToClipboard() {
	const email = document.getElementById('emailToCopy').textContent;
	const textArea = document.createElement('textarea');
	textArea.value = email;
	document.body.appendChild(textArea);
	textArea.select();
	document.execCommand('copy');
	document.body.removeChild(textArea);

	showTooltip();
}

function showTooltip() {
	const tooltip = document.createElement('div');
	tooltip.classList.add('copy-tooltip');
	tooltip.textContent = 'Copied to clipboard!';
	document.body.appendChild(tooltip);
	setTimeout(() => {
		document.body.removeChild(tooltip);
	}, 2000);
}

document.querySelectorAll('.click-to-copy').forEach(element => {
	element.addEventListener('click', function () {
		let textToCopy = this.textContent;
		let textArea = document.createElement('textarea');
		textArea.value = textToCopy;
		document.body.appendChild(textArea);
		textArea.select();
		document.execCommand('copy');
		document.body.removeChild(textArea);

		// Show "Copied to clipboard!" message
		let notification = document.createElement('div');
		notification.innerText = 'Copied to clipboard!';
		notification.style.position = 'fixed';
		notification.style.bottom = '20px';
		notification.style.right = '20px';
		notification.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
		notification.style.color = 'white';
		notification.style.padding = '10px 20px';
		notification.style.borderRadius = '5px';
		document.body.appendChild(notification);

		// Hide the message after 3 seconds
		setTimeout(function () {
			document.body.removeChild(notification);
		}, 3000);
	});
});

// Smooth button move

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
	anchor.addEventListener('click', function (e) {
		e.preventDefault();

		document.querySelector(this.getAttribute('href')).scrollIntoView({
			behavior: 'smooth'
		});
	});
});


function scrollGallery(direction) {
	const container = document.querySelector('.certificate-container');
	const scrollAmount = container.clientWidth / 2;

	if (direction === 'left') {
		container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
	} else {
		container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
	}
}

function updateArrowsVisibility() {
	const container = document.querySelector('.certificate-container');
	const leftArrow = document.querySelector('.scroll-left');
	const rightArrow = document.querySelector('.scroll-right');

	leftArrow.style.display = container.scrollLeft > 0 ? 'flex' : 'none';
	rightArrow.style.display = container.scrollLeft + container.clientWidth < container.scrollWidth ? 'flex' : 'none';
}

document.querySelector('.certificate-container').addEventListener('scroll', updateArrowsVisibility);
window.addEventListener('resize', updateArrowsVisibility);
window.addEventListener('DOMContentLoaded', updateArrowsVisibility);



// Certificates popup poptrox

$(document).ready(function () {
	$('.certificate-container').poptrox({
		selector: 'a.poptrox-item',
		popupLoaderText: 'Loading...',
		usePopupCaption: false,
		usePopupNav: false,		
	});
});



/* TESTER */


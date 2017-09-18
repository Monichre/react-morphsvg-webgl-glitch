import React, { Component } from 'react'
import anime from 'animejs'
import GlitchMenu from './GlitchMenu'

// Helper vars and functions.
const is3DBuggy = navigator.userAgent.indexOf('Firefox') > 0;

// From https://davidwalsh.name/javascript-debounce-function.
function debounceShatter(func, wait, immediate) {
	var timeout;
	return function () {
		var context = this, args = arguments;
		var later = function () {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

// from http://www.quirksmode.org/js/events_properties.html#position
const getMousePos = (e) => {
	let posx = 0;
	let posy = 0;
	if (!e) { let e = window.event };
	if (e.pageX || e.pageY) {
		posx = e.pageX;
		posy = e.pageY;
	}
	else if (e.clientX || e.clientY) {
		posx = e.clientX + document.body.scrollLeft
			+ document.documentElement.scrollLeft;
		posy = e.clientY + document.body.scrollTop
			+ document.documentElement.scrollTop;
	}
	return {
		x: posx,
		y: posy
	};
}
const piece = (props) => (
	<div className='piece' style={props.piece_style}>

	</div>
)

class Pieces {
	constructor(el, options) {
		this.DOM = {};
		this.DOM.el = el;
		this.options = {
			// Number of pieces / Layout (rows x cols).
			pieces: { rows: 12, columns: 10 },
			hasTilt: false,
			// Main image tilt: max and min angles.
			tilt: { maxRotationX: -2, maxRotationY: 2, maxTranslationX: 4, maxTranslationY: -2 },
			delay: 0, // Number || Array(random number from [min,max], e.g. [0,300] would set a random delay per piece from 0 to 300)
			// background image src.
			bgimage: 'none',
			// default animations:
			animationDefaults: {
				duration: 600,
				easing: [0.2, 1, 0.3, 1],
				delay: (t, i) => {
					return i * parseInt(t.dataset.delay);
				},
				translateX: (t, i) => {
					return t.dataset.column < this.getTotalColumns() / 2 ? anime.random(50, 100) + 'px' : anime.random(-100, -50) + 'px';
				},
				translateY: (t, i) => {
					return anime.random(-1000, -800) + 'px';
				},
				opacity: {
					value: 0,
					duration: 600,
					easing: 'linear'
				}
			}
		};
		Object.assign(this.options, options);
		this.init();
	}
	init() {
		// Window sizes.
		this.win = { width: window.innerWidth, height: window.innerHeight };
		// Container sizes.
		this.dimensions = { width: this.DOM.el.offsetWidth, height: this.DOM.el.offsetHeight };
		// Render all the pieces defined in the options.
		this.layout();
		// Init tilt.
		if (this.options.hasTilt) {
			this.initTilt();
		}
		// Init/Bind events
		this.initEvents();
	}
	layout() {
		// The source of the main image.
		this.imgsrc = this.DOM.el.style.backgroundImage.replace('url(', '').replace(')', '').replace(/\"/gi, "");
		// The background image.
		this.DOM.el.style.backgroundImage = this.options.bgimage !== 'none' ? `url(${this.options.bgimage})` : 'none';
		// Create the pieces and add them to the DOM (append it to the main element).
		this.pieces = [];
		for (let r = 0; r < this.options.pieces.rows; r++) {
			for (let c = 0; c < this.options.pieces.columns; c++) {
				const piece = this.createPiece(r, c);
				piece.style.backgroundPosition = `${-1 * c * 100}% ${-1 * 100 * r}%`;
				let width = 86;
				piece.style.left += c * width;
				this.pieces.push(piece);
			}
		}
	}
	createPiece(row, column) {
		const w = Math.round((this.dimensions.width / this.options.pieces.columns) * 2);
		const h = Math.round((this.dimensions.height / this.options.pieces.rows) * 2);
		const piece = document.createElement('div');

		piece.style.backgroundImage = `url(${this.imgsrc})`;
		piece.className = 'piece';
		piece.style.width = `${w}px`;
		piece.style.height = `${h}px`;
		piece.style.backgroundSize = `${w * this.options.pieces.columns + 4}px auto`;
		piece.style.position = 'relative';
		piece.dataset.row = row;
		piece.dataset.column = column;
		piece.dataset.delay = this.options.delay instanceof Array ? anime.random(this.options.delay[0], this.options.delay[1]) : this.options.delay;
		for (let c = 0; c < this.options.pieces.columns; c++) {

			let width = 86;
			piece.style.left = c * width;

		}
		this.DOM.el.appendChild(piece);
		this.DOM.el.style.width = `${w * this.options.pieces.columns}px`;
		this.DOM.el.style.height = `${h * this.options.pieces.rows}px`;

		return piece;
	}
	// Set the pieces background image.
	setImage(imgsrc) {
		this.imgsrc = imgsrc;
		for (const piece of this.pieces) {
			piece.style.backgroundImage = `url(${this.imgsrc})`;
		}
	}
	initTilt() {
		if (is3DBuggy) return;
		this.DOM.el.style.transition = 'transform 0.2s ease-out';
		this.tilt = true;
	}
	removeTilt() {
		if (is3DBuggy) return;
		this.tilt = false;
	}
	initEvents() {
		// Mousemove event / Tilt functionality.
		const onMouseMoveFn = (ev) => {
			requestAnimationFrame(() => {
				if (!this.tilt) {
					if (is3DBuggy) {
						this.DOM.el.style.transform = 'none';
					}
					return false;
				}
				const mousepos = getMousePos(ev);
				const docScrolls = { left: document.body.scrollLeft + document.documentElement.scrollLeft, top: document.body.scrollTop + document.documentElement.scrollTop };
				const mouseposScroll = { x: mousepos.x - docScrolls.left, y: mousepos.y - docScrolls.top };
				const rotX = 2 * this.options.tilt.maxRotationX / this.win.height * mouseposScroll.y - this.options.tilt.maxRotationX;
				const rotY = 2 * this.options.tilt.maxRotationY / this.win.width * mouseposScroll.x - this.options.tilt.maxRotationY;
				const transX = 2 * this.options.tilt.maxTranslationX / this.win.width * mouseposScroll.x - this.options.tilt.maxTranslationX;
				const transY = 2 * this.options.tilt.maxTranslationY / this.win.height * mouseposScroll.y - this.options.tilt.maxTranslationY;

				this.DOM.el.style.transform = `perspective(1000px) translate3d(${transX}px, ${transY}px,0) rotate3d(1,0,0,${rotX}deg) rotate3d(0,1,0,${rotY}deg)`;
			});
		};

		// Window resize.
		const onResizeFn = debounceShatter(() => {
			this.win = { width: window.innerWidth, height: window.innerHeight };
			this.DOM.el.style.width = this.DOM.el.style.height = '';
			const elBounds = this.DOM.el.getBoundingClientRect();
			this.dimensions = { width: elBounds.width, height: elBounds.height };
			for (let i = 0, len = this.pieces.length; i < len; i++) {
				const w = Math.round(this.dimensions.width / this.options.pieces.columns);
				const h = Math.round(this.dimensions.height / this.options.pieces.rows);
				const piece = this.pieces[i];

				piece.style.width = `${w}px`;
				piece.style.height = `${h}px`;
				piece.style.backgroundSize = `${w * this.options.pieces.columns + 4}px auto`;
				this.DOM.el.style.width = `${w * this.options.pieces.columns}px`;
				this.DOM.el.style.height = `${h * this.options.pieces.rows}px`;
			}
		}, 20);

		document.addEventListener('mousemove', onMouseMoveFn);
		window.addEventListener('resize', (ev) => onResizeFn());
	}
	getTotalRows() {
		return this.options.pieces.rows;
	}
	getTotalColumns() {
		return this.options.pieces.columns;
	}
	animate(animeopts) {
		animeopts = animeopts || this.options.animationDefaults;
		let opts = {
			targets: this.pieces
		};
		Object.assign(opts, animeopts);
		anime.remove(this.pieces);
		anime(opts);
	}
};



export default class Menu extends Component {
    constructor(props){
        super(props)
    }
    runAnimation() {
		const piecesEl = document.querySelector('.content .pieces');
		const piecesObj = new Pieces(piecesEl, {
			pieces: {
				rows: 14,
				columns: 12
			}
		});
		const menuEl = document.querySelector('.page-nav');
		const optionsCtrl = document.querySelector('.content__title');
		const closeOptionsCtrl = menuEl.querySelector('a.page-nav__item--close');

		const showOptions = () => {
			menuEl.classList.add('page-nav--open');

			piecesObj.animate({
				duration: 3000,
				delay: (t, i) => {
					const elBounds = piecesEl.getBoundingClientRect();
					const x1 = elBounds.left + elBounds.width / 2;
					const y1 = elBounds.top + elBounds.height / 2;
					const tBounds = t.getBoundingClientRect();
					const x2 = tBounds.left + tBounds.width / 2;
					const y2 = tBounds.top + tBounds.height / 2;
					const dist = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
					const maxDist = Math.sqrt(Math.pow(elBounds.left - x1, 2) + Math.pow(elBounds.top - y1, 2));
					const maxDelay = 300;

					t.dataset.centerx = x2;
					t.dataset.centery = y2;

					return -1 * maxDelay / maxDist * dist + maxDelay;
				},
				easing: [0.1, 1, 0, 1],
				translateX: (t, i) => {
					return t.dataset.column < piecesObj.getTotalColumns() / 2 ? anime.random(-400, 0) : anime.random(
						0, 400);
				},
				translateY: (t, i) => {
					return t.dataset.row < piecesObj.getTotalRows() / 2 ? anime.random(-400, 0) : anime.random(0, 400);
				},
				opacity: 0.2
			});

			anime.remove(optionsCtrl);
			anime({
				targets: optionsCtrl,
				duration: 700,
				easing: 'easeOutExpo',
				scale: 1.2,
				opacity: 0
			});

			anime.remove(menuEl);
			anime({
				targets: menuEl,
				duration: 700,
				delay: 150,
				easing: 'easeOutExpo',
				scale: [0, 1],
				opacity: 1
			});
		};

		const hideOptions = (ev) => {
			ev.preventDefault();
			menuEl.classList.remove('page-nav--open');

			piecesObj.animate({
				duration: 600,
				delay: (t, i) => {
					const elBounds = piecesEl.getBoundingClientRect();
					const x1 = elBounds.left + elBounds.width / 2;
					const y1 = elBounds.top + elBounds.height / 2;
					const x2 = t.dataset.centerx;
					const y2 = t.dataset.centery;
					const dist = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
					const maxDist = Math.sqrt(Math.pow(elBounds.left - x1, 2) + Math.pow(elBounds.top - y1, 2));
					const maxDelay = 800;

					return maxDelay / maxDist * dist;
				},
				easing: [0.1, 1, 0, 1],
				translateX: 0,
				translateY: 0,
				opacity: 1
			});

			anime.remove(optionsCtrl);
			anime({
				targets: optionsCtrl,
				duration: 700,
				delay: 200,
				easing: 'easeOutQuint',
				scale: [1.1, 1],
				opacity: 1
			});

			anime.remove(menuEl);
			anime({
				targets: menuEl,
				duration: 700,
				easing: 'easeOutQuint',
				scale: 0.8,
				opacity: 0
			});
		};

		optionsCtrl.addEventListener('click', showOptions);
		closeOptionsCtrl.addEventListener('click', hideOptions);
	}

    render() {
        const bg_style = {
			backgroundImage: 'url(img/jud-left.jpg)'
        }
        return (
            <main>
                <GlitchMenu runAnimation={this.runAnimation.bind(this)} />
            </main>
        )

    }
}
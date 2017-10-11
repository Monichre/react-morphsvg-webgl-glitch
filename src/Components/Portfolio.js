import React, { Component } from 'react'
import imagesLoaded from 'react-images-loaded'
import anime from 'animejs'
import scrollMonitor from 'scrollmonitor'

import '../css/Portfolio.css'



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


const debounce = (func, wait, immediate) => {
	let timeout;
	return () => {
		let context = this, args = arguments;
		let later = () => {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		let callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

const distance = (x1, x2, y1, y2) => {
	const a = x1 - x2;
	const b = y1 - y2;
	return Math.sqrt(a * a + b * b);
};

let win = { width: window.innerWidth, height: window.innerHeight };
let center = { x: win.width / 2, y: win.height / 2 };

class GridItem {
	constructor(el, options) {
		this.CONFIG = {
			filledColor: 'rgba(0,0,0,0)'
		};
		Object.assign(this.CONFIG, options);
		this.DOM = {};
		this.DOM.el = el;
		const bcr = this.DOM.el.getBoundingClientRect();
		this.itemCenter = {
			x: bcr.left + bcr.width / 2,
			y: bcr.top + bcr.height / 2
		};
		this.revealer = new Revealer(this.DOM.el, { color: this.CONFIG.filledColor || window.getComputedStyle(document.body, null).backgroundColor });
		this.initEvents();
	}
	initEvents() {
		window.addEventListener('resize', (ev) => debounce(this.onresize()));
	}
	onresize(ev) {
		const bcr = this.DOM.el.getBoundingClientRect();
		this.itemCenter = {
			x: bcr.left + bcr.width / 2,
			y: bcr.top + bcr.height / 2
		};
	}
	show(animation = true) {
		return animation ? this.revealer.show({ direction: this.DOM.el.dataset.direction || 'rtl', delay: this.DOM.el.dataset.delay || 0 }) : this.revealer.show();
	}
	hide(animation = true) {
		return animation ? this.revealer.hide({ direction: this.DOM.el.dataset.direction || 'rtl', delay: this.DOM.el.dataset.delay || 0 }) : this.revealer.hide();
	}
	showFilled() {
		return this.revealer.showFilled({ direction: this.DOM.el.dataset.direction || 'rtl', delay: this.DOM.el.dataset.delay || 0 });
	}
	hideFilled() {
		return this.revealer.hideFilled({ direction: this.DOM.el.dataset.direction || 'rtl', delay: this.DOM.el.dataset.delay || 0 });
	}
	setTransform(transform) {
		const dist = distance(this.itemCenter.x, this.itemCenter.y, center.x, center.y);
		const tx = transform.translateX / win.width * dist || 0;
		const ty = transform.translateY / win.height * dist || 0;
		this.DOM.el.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
	}
	isNavCtrl() {
		return this.DOM.el.classList.contains('grid__item--nav');
	}
}

class Grid {
	constructor(el, options) {
		this.CONFIG = {
			filledColor: '#fff'
		};
		Object.assign(this.CONFIG, options);
		this.DOM = {};
		this.DOM.el = el;
		this.DOM.items = Array.from(this.DOM.el.querySelectorAll('div.grid__item'));
		this.DOM.name = this.DOM.el.querySelector('.grid__item--name');
		this.DOM.title = this.DOM.el.querySelector('.grid__item--title');
		this.DOM.text = this.DOM.el.querySelector('.grid__item--text');
		this.textElems = [this.DOM.name, this.DOM.title, this.DOM.text];
		this.layout();
	}
	layout() {
		this.itemsTotal = this.DOM.items.length;
		this.items = [];
		this.DOM.items.forEach((item) => this.items.push(new GridItem(item, { filledColor: this.CONFIG.filledColor })));
	}
	show(filled = false, animation = true) {
		return new Promise((resolve, reject) => {
			this.DOM.el.classList.add('grid--animating');
			this.hideItems();

			this.DOM.el.classList.add('grid--current');
			const promises = [];
			for (let i = 0; i < this.itemsTotal; i++) {
				const promise = filled ? this.items[i].showFilled() : this.items[i].show(animation);
				promises.push(promise);
			};
			for (let i = 0, len = this.textElems.length; i < len; i++) {
				const promise = this.animateText(this.textElems[i], 'In');
				promises.push(promise);
			};
			Promise.all(promises).then(() => {
				this.resetTextClasses('In');
				this.DOM.el.classList.remove('grid--animating');
				resolve()
			});
		});
	}
	hide(filled = false, animation = true) {
		return new Promise((resolve, reject) => {
			this.DOM.el.classList.add('grid--animating');
			const promises = [];
			for (let i = 0; i < this.itemsTotal; i++) {
				const promise = filled ? this.items[i].hideFilled() : this.items[i].hide(animation);
				promises.push(promise);
			};
			for (let i = 0, len = this.textElems.length; i < len; i++) {
				const promise = this.animateText(this.textElems[i], 'Out');
				promises.push(promise);
			};
			Promise.all(promises).then(() => {
				this.resetTextClasses('Out');
				this.DOM.el.classList.remove('grid--animating');
				this.DOM.el.classList.remove('grid--current');
				resolve();
			});
		});
	}
	animateText(el, dir) {
		return new Promise((resolve, reject) => {
			el.classList.add(`grid__item--animate${dir}`);
			el.addEventListener('animationend', resolve);
		});
	}
	resetTextClasses(dir) {
		for (let i = 0, len = this.textElems.length; i < len; i++) {
			this.textElems[i].classList.remove(`grid__item--animate${dir}`);
		};
	}
	hideItems() {
		for (let i = 0; i < this.itemsTotal; i++) {
			this.items[i].hide(false);
		};
	}
	tilt(transform) {
		for (let i = 0; i < this.itemsTotal; i++) {
			const item = this.items[i];
			if (!item.isNavCtrl()) {
				item.setTransform(transform);
			}
		};
	}
};

class Slideshow {
	constructor(grids, options) {
		this.CONFIG = {
			filledColor: false, // false || colorvalue (e.g. '#666')
			hasTilt: false,
			tilt: { maxTranslationX: 50, maxTranslationY: 50 }
		};
		Object.assign(this.CONFIG, options);
		this.DOM = {};
		this.DOM.grids = grids;
		this.init();
	}
	init() {
		this.current = 0;
		this.gridsTotal = this.DOM.grids.length;
		this.grids = [];
		this.DOM.grids.forEach((grid) => this.grids.push(new Grid(grid, {
			filledColor: this.CONFIG.filledColor
		})));
		this.initEvents();
	}
	initEvents() {
		Array.from(document.querySelectorAll('.grid__item--nav-next')).forEach((ctrl) => ctrl.addEventListener('click', (ev) => this.navigate(ev, 'next')));
		Array.from(document.querySelectorAll('.grid__item--nav-prev')).forEach((ctrl) => ctrl.addEventListener('click', (ev) => this.navigate(ev, 'prev')))
		if (this.CONFIG.hasTilt) {
			document.addEventListener('mousemove', (ev) => this.onmousemove(ev));
			window.addEventListener('resize', (ev) => debounce(this.onresize()));
		}
	}
	onmousemove(ev) {
		requestAnimationFrame(() => {
			const mousepos = getMousePos(ev);
			const transX = 2 * this.CONFIG.tilt.maxTranslationX / win.width * mousepos.x - this.CONFIG.tilt.maxTranslationX;
			const transY = 2 * this.CONFIG.tilt.maxTranslationY / win.height * mousepos.y - this.CONFIG.tilt.maxTranslationY;
			this.grids[this.current].tilt({ translateX: transX, translateY: transY });
		});
	}
	onresize(ev) {
		win = { width: window.innerWidth, height: window.innerHeight };
		center = { x: win.width / 2, y: win.height / 2 };
	}
	navigate(ev, direction) {
		if (this.isAnimating) {
			return false;
		}
		this.isAnimating = true;
		const currentGrid = this.grids[this.current];
		this.current = direction === 'next' ? (this.current < this.gridsTotal - 1 ? this.current + 1 : 0) : (this.current > 0 ? this.current - 1 : this.gridsTotal - 1);
		const nextGrid = this.grids[this.current];
		const filled = this.CONFIG.filledColor;
		currentGrid.hide(!!filled).then(() => {
			nextGrid.show(!!filled).then(() => this.isAnimating = false);
			if (this.CONFIG.hasTilt) {
				this.onmousemove(ev);
			}
		});
	}
}

class Revealer {
		constructor(el, options) {
			this.CONFIG = {
				hidden: false,
				color: '#fff'
			};
			Object.assign(this.CONFIG, options);

			this.DOM = {};
			this.DOM.item = el;
			this.layout();
		}
		layout() {
			this.allClasses = ['revealer--visible','revealer--right','revealer--left','revealer--top','revealer--bottom','revealer--showX','revealer--showY','revealer--hideX','revealer--hideY'];

			this.revealerEl = document.createElement('div');
			this.revealerEl.className = 'revealer';
			this.revealerEl.style.backgroundColor = this.CONFIG.color;
			this.DOM.item.appendChild(this.revealerEl);

			if ( this.CONFIG.hidden ) {
				this.revealerEl.classList.add('revealer--visible');
			}
		}
		show(animation) {
			return this.toggle(animation, 'show');
		}
		hide(animation) {
			return this.toggle(animation, 'hide');
		}
		toggle(animationOpts, action) {
			return new Promise((resolve, reject) => {
				if ( animationOpts ) {
					this.animate(animationOpts, action);
					this.revealerEl.addEventListener('animationend', resolve);
				}
				else {
					this.revealerEl.classList.remove(...this.allClasses);
					this.revealerEl.classList.add('revealer--visible');
					resolve();
				}
			});
		}
		showFilled(animation) {
			return new Promise((resolve, reject) => {
				this.hide();
				animation.target = this.DOM.item;
				animation.target.style.visibility = 'hidden';
				this.animate(animation, 'hide');

				let completefn = () => {
					animation.target.removeEventListener('animationend', completefn);
					animation.target = this.revealerEl;
					this.animate(animation, 'show');
					animation.target.addEventListener('animationend', (ev) => {
						if ( ev.target === animation.target ) {
							resolve();
						}
					});
				};
				animation.target.addEventListener('animationend', completefn);
			});
		}
		hideFilled(animation) {
			return new Promise((resolve, reject) => {
				this.animate(animation, 'hide');

				let completefn = () => {
					this.revealerEl.removeEventListener('animationend', completefn);
					animation.target = this.DOM.item;
					this.animate(animation, 'show');
					animation.target.addEventListener('animationend', (ev) => {
						if ( ev.target === animation.target ) {
							resolve();
						}
					});
				};
				this.revealerEl.addEventListener('animationend', completefn);
			});
		}
		animate(animationOpts, action) {
			setTimeout(() => {
				const target = animationOpts.target || this.revealerEl;
				target.style.visibility = 'visible';
				target.classList.remove(...this.allClasses);

				let dirClass = 'revealer--right'; 
				let orientation = 'h';

				if ( animationOpts.direction === 'rtl' ) {
					dirClass = action === 'hide' ? 'revealer--right' : 'revealer--left';
					orientation = 'h';
				}
				else if ( animationOpts.direction === 'ltr' ) {
					dirClass = action === 'hide' ? 'revealer--left' : 'revealer--right';
					orientation = 'h';
				}
				else if ( animationOpts.direction === 'ttb' ) {
					dirClass = action === 'hide' ? 'revealer--top' : 'revealer--bottom';
					orientation = 'v';
				}
				else if ( animationOpts.direction === 'btt' ) {
					dirClass = action === 'hide' ? 'revealer--bottom' : 'revealer--top';
					orientation = 'v';
				}
				target.classList.add(dirClass, orientation === 'h' ? `revealer--${action}X` : `revealer--${action}Y`);
			}, animationOpts.delay || 0);
		}
	}



export default class Portfolio extends Component {
	constructor(props) {
		super(props)

		this.state = {
			videos: []
		}

	}
	componentDidMount() {
		let grid = document.querySelector('.grid')
		let item = document.querySelector('.grid__item')
		

		let this_revealer = new Revealer(item, 'show')
		let new_grid = new Grid(grid)
		let new_grid_item = new GridItem(item)
		let GRIDS = Array.from(document.querySelectorAll('.grid'));
		let new_slideShow = new Slideshow(GRIDS, {
					hasTilt: true,
					tilt: {maxTranslationX: 25, maxTranslationY: 25}
				})
		// this_revealer.show()
		new_grid.show()
		
	}


	render() {
		const portfolio_styles = {
			paddingTop: '100px',
			// position: 'relative'
		}
		const bg_style = {
			background: 'transparent'
		}
		const videos = this.props.videos.map(video => {
			let bg_image
			if (video.pictures){
				bg_image =  video.pictures.sizes[2].link
				return (
						<div className="grid__item">
							<img src={bg_image} alt="" />
						</div>
					)
			}
		})
		

		return (
			<div id="Portfolio" style={portfolio_styles}>
				<div className="grid grid--layout-3">
					{videos}

					<h2 className="grid__item grid__item--name" >Oyo<br /> Expo <br />2019</h2>
					<h3 className="grid__item grid__item--title">Paris</h3>
					<p className="grid__item grid__item--text">Dignified teacakes air one's dirty linen off t'shop scouser quid pezzy little taking the mick</p>
						
				</div>
			</div>
		)
	}


}


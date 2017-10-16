import React, { Component } from 'react'
import {BackgroundImage, PostEffect, ConsoleSignature} from './Partials/Glitch'
import Footer from './Partials/Footer'


import * as THREE from 'three';
import Menu from './Partials/Menu'




export default class Home extends Component {

	componentWillMount() {
	}
	componentDidMount() {

	const debounce = (callback, duration) => {
			var timer;
			return function (event) {
				clearTimeout(timer);
				timer = setTimeout(function () {
					callback(event);
				}, duration);
			};
		};
	
		
		const canvas = document.createElement('canvas');
		const renderer = new THREE.WebGLRenderer({
			antialias: false,
			canvas: canvas,
		});
		const renderBack1 = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight);
		const scene = new THREE.Scene();
		const sceneBack = new THREE.Scene();
		const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
		const cameraBack = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
		const clock = new THREE.Clock();

		const bgImg = new BackgroundImage();
		const postEffect = new PostEffect(renderBack1.texture);
		const consoleSignature = new ConsoleSignature();

		

		//
		// common process
		//
		const resizeWindow = () => {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
			cameraBack.aspect = window.innerWidth / window.innerHeight;
			cameraBack.updateProjectionMatrix();
			bgImg.resize();
			postEffect.resize();
			renderBack1.setSize(window.innerWidth, window.innerHeight);
			renderer.setSize(window.innerWidth, window.innerHeight);
		}
		const render = () => {
			const time = clock.getDelta();
			renderer.render(sceneBack, cameraBack, renderBack1);
			postEffect.render(time);
			renderer.render(scene, camera);
		}
		const renderLoop = () => {
			render();
			requestAnimationFrame(renderLoop);
		}

		const on = () => {
			window.addEventListener('resize', debounce(() => {
				resizeWindow();
			}), 1000);
		}

		const init = () => {
			renderer.setSize(window.innerWidth, window.innerHeight);
			renderer.setClearColor(0x111111, 1.0);
			cameraBack.position.set(0, 0, 100);
			cameraBack.lookAt(new THREE.Vector3());


			bgImg.init("img/jud-left.jpg", () => {
				sceneBack.add(bgImg.obj);
				scene.add(postEffect.obj);
			})
			document.getElementById('Home').appendChild(canvas);

			on();
			resizeWindow();
			renderLoop();
		}
		
		init();

	}
	
	render() {
		

		return (
			<div className="demo-grid">
				<div id="Home" className="Home">
					<Menu />
					<Footer />
				</div>
			</div>
		);
	}
}
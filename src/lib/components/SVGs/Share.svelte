<script lang="ts">
	import { toast } from '@zerodevx/svelte-toast';
	import { onMount } from 'svelte';

	export let color: string = '#4b5563';
	export let hoverColor: string = '#2563eb';
	let qrCodeSrc: string;
	let currentColor = color;

	export let classes: string = 'absolute top-4 right-4';
	let copyBtn: HTMLButtonElement;
	let svgElement: SVGSVGElement;
	let QRCode: HTMLImageElement;
	onMount(() => {
		qrCodeSrc = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${window.location.href}`;
		copyBtn.addEventListener('click', copyToClipboard);
		QRCode.addEventListener('click', copyToClipboard);

		svgElement.addEventListener('mouseover', () => {
			currentColor = hoverColor;
		});

		svgElement.addEventListener('mouseout', () => {
			currentColor = color;
		});

		function copyToClipboard() {
			navigator.clipboard.writeText(window.location.href);
			toast.push('Link copied to clipboard', {
				theme: { '--toastBackground': 'green', '--toastBarBackground': 'limegreen' },
				duration: 6900
			});
			setTimeout(() => {
				toast.pop(0);
			}, 20000);
		}
	});
</script>

<button bind:this={copyBtn}>
	<svg
		bind:this={svgElement}
		class={classes}
		width="24"
		height="24"
		viewBox="0 0 50 50"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M16.7948 21.8617L33.3648 13.5766M33.3728 36.8617L16.8183 28.5844M47.5838 10.2172C47.5838 14.3593 44.2261 17.7172 40.0838 17.7172C35.9416 17.7172 32.5838 14.3593 32.5838 10.2172C32.5838 6.07504 35.9416 2.71716 40.0838 2.71716C44.2261 2.71716 47.5838 6.07504 47.5838 10.2172ZM17.5838 25.2172C17.5838 29.3594 14.226 32.7172 10.0838 32.7172C5.94171 32.7172 2.58383 29.3594 2.58383 25.2172C2.58383 21.0749 5.94171 17.7172 10.0838 17.7172C14.226 17.7172 17.5838 21.0749 17.5838 25.2172ZM47.5838 40.2172C47.5838 44.3594 44.2261 47.7172 40.0838 47.7172C35.9416 47.7172 32.5838 44.3594 32.5838 40.2172C32.5838 36.0749 35.9416 32.7172 40.0838 32.7172C44.2261 32.7172 47.5838 36.0749 47.5838 40.2172Z"
			stroke={currentColor}
			stroke-width="3.75"
		/>
	</svg>
</button>

<button id="copyBtn" bind:this={copyBtn} title="Click to copy link">
	<svg
		bind:this={svgElement}
		class={classes}
		width="24"
		height="24"
		viewBox="0 0 50 50"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M16.7948 21.8617L33.3648 13.5766M33.3728 36.8617L16.8183 28.5844M47.5838 10.2172C47.5838 14.3593 44.2261 17.7172 40.0838 17.7172C35.9416 17.7172 32.5838 14.3593 32.5838 10.2172C32.5838 6.07504 35.9416 2.71716 40.0838 2.71716C44.2261 2.71716 47.5838 6.07504 47.5838 10.2172ZM17.5838 25.2172C17.5838 29.3594 14.226 32.7172 10.0838 32.7172C5.94171 32.7172 2.58383 29.3594 2.58383 25.2172C2.58383 21.0749 5.94171 17.7172 10.0838 17.7172C14.226 17.7172 17.5838 21.0749 17.5838 25.2172ZM47.5838 40.2172C47.5838 44.3594 44.2261 47.7172 40.0838 47.7172C35.9416 47.7172 32.5838 44.3594 32.5838 40.2172C32.5838 36.0749 35.9416 32.7172 40.0838 32.7172C44.2261 32.7172 47.5838 36.0749 47.5838 40.2172Z"
			stroke={currentColor}
			stroke-width="3.75"
		/>
	</svg>
</button>

<img
	bind:this={QRCode}
	id="qrCode"
	class="customBorder absolute top-[15px] right-4 opacity-100 z-20"
	width="150"
	height="150"
	src={qrCodeSrc}
	alt="QR Code"
/>

<style>
	#qrCode {
		transform: translateY(30px);
		opacity: 0;
		visibility: hidden;
		transition: opacity 0.3s ease-in-out;
	}
	#copyBtn:hover + #qrCode {
		opacity: 1;
		visibility: visible;
	}
	#qrCode:hover {
		opacity: 1;
		cursor: pointer;
		visibility: visible;
	}
</style>

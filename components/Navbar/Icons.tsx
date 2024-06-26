export function Edit({ fillColor}) {
	const color = fillColor || '#000000';
  	return (
		<svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M14 6L8 12V16H12L18 10M14 6L17 3L21 7L18 10M14 6L18 10M10 4L4 4L4 20L20 20V14" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
		</svg>
 	);
}

export function NotificationBell({ fillColor}) {
	const color = fillColor || '#000000';
  	return (
		<svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" transform="matrix(1, 0, 0, 1, 0, 0)">
			<g id="SVGRepo_bgCarrier" stroke-width="0"/>
			<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
			<g id="SVGRepo_iconCarrier">
				<g>
					<path d="M9.5 19C8.89555 19 7.01237 19 5.61714 19C4.87375 19 4.39116 18.2177 4.72361 17.5528L5.57771 15.8446C5.85542 15.2892 6 14.6774 6 14.0564C6 13.2867 6 12.1434 6 11C6 9 7 5 12 5C17 5 18 9 18 11C18 12.1434 18 13.2867 18 14.0564C18 14.6774 18.1446 15.2892 18.4223 15.8446L19.2764 17.5528C19.6088 18.2177 19.1253 19 18.382 19H14.5M9.5 19C9.5 21 10.5 22 12 22C13.5 22 14.5 21 14.5 19M9.5 19C11.0621 19 14.5 19 14.5 19" stroke={color} stroke-linejoin="round"/>
					<path d="M12 5V3" stroke={color} stroke-linecap="round" stroke-linejoin="round"/>
				</g> 
			</g>
		</svg>
 	);
}

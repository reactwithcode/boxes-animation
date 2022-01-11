import { useEffect, useState } from 'react';
import './App.css';

export default function App() {
	const boxSpeed = 10; // in ms
	const boxAmount = 10; // per row, and per column
	const colorSmooth = 0.5; // adjust this for color density between frames
	const box = { r: 16, g: 0, b: 43 };

	const [boxes, setBoxes] = useState([box]);
	const [ifIncrement, setIfIncrement] = useState(true);

	const aniMath = (box) => {
		let r = box.r,
			g = box.g,
			b = box.b,
			lighter = {
				r: r + colorSmooth,
				g: g + colorSmooth,
				b: b + colorSmooth,
			},
			darker = { r: r - colorSmooth, g: g - colorSmooth, b: b - colorSmooth };

		if (ifIncrement) {
			if (r < 255 && g < 255 && b < 255) {
				return lighter;
			} else {
				setIfIncrement(false);
				return darker;
			}
		} else {
			if (r > 0 && g > 0 && b > 0) {
				return darker;
			} else {
				setIfIncrement(true);
				return lighter;
			}
		}
	};

	useEffect(() => {
		const interval = setInterval(() => {
			// copy the current state
			let copyBoxes = [...boxes];
			// remove boxes if necessary
			while (copyBoxes.length >= Math.pow(boxAmount, 2)) {
				copyBoxes.shift();
			}

			// add a box to the current state
			// [box, box, box]
			const nextBox = aniMath(copyBoxes[copyBoxes.length - 1]);
			copyBoxes.push(nextBox);
			// save it
			setBoxes(copyBoxes);
		}, boxSpeed);
		return () => {
			clearInterval(interval);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [boxes]);

	return (
		<div className="App">
			{boxes.map((box, i) => (
				<div
					key={i}
					className="Box"
					style={{
						width: `${100 / boxAmount}vw`,
						height: `${100 / boxAmount}vh`,
						backgroundColor: `rgb(${box.r}, ${box.g}, ${box.b})`,
					}}
				/>
			))}
		</div>
	);
}

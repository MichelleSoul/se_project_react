import { useState, useEffect } from "react";
import "./Avatar.css";

const Avatar = ({ avatar, name, size }) => {
	const [hasError, setHasError] = useState(false);

	useEffect(() => {
		setHasError(false);
	}, [avatar]);

	return (
		<>
			{!hasError && (
				<img
					src={avatar}
					alt={name}
					width={size}
					height={size}
					onError={() => setHasError(true)}
					className="avatar__icon"
				/>
			)}

			{hasError && (
				<div
					style={{ width: size, height: size }}
					className="avatar__noicon"
				>
					{name?.[0]}
				</div>
			)}
		</>
	);
}

export default Avatar;
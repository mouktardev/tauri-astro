import * as Icons from "@svg/Icons";
import React, { useState } from "react";

interface ImageProps {
	src: string;
	alt: string;
	className?: string;
}

const Image: React.FC<ImageProps> = ({ src, alt, className }) => {
	const [isLoading, setIsLoading] = useState(true);

	const handleLoad = () => {
		setIsLoading(false);
	};

	return (
		<div>
			{isLoading && (
				<div className="w-full h-60 flex items-center justify-center">
					<Icons.Spinner className="h-6 w-6 text-neutral-800 dark:text-white" />
				</div>
			)}
			<img
				className={className}
				src={src}
				alt={alt}
				onLoad={handleLoad}
				style={{ display: isLoading ? "none" : "block" }}
			/>
		</div>
	);
};

export default Image;

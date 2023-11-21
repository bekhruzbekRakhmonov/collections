import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Card, CardContent, Typography } from "@mui/material";

interface ImageDropzoneProps {
	onImageDrop: (file: File) => void;
}

const ImageDropzone: React.FC<ImageDropzoneProps> = ({ onImageDrop }) => {
	const [selectedImage, setSelectedImage] = useState<File | null>(null);

	const onDrop = useCallback(
		(acceptedFiles: File[]) => {
			const file = acceptedFiles[0];
			setSelectedImage(file);
			onImageDrop(file);
		},
		[onImageDrop]
	);

	const { getRootProps, getInputProps } = useDropzone({
		onDrop,
		accept: {
			"image/*": [".png", ".gif", ".jpeg", ".jpg"],
		},
		maxFiles: 1,
	});

	return (
		<Card>
			<CardContent>
				<div {...getRootProps()} style={dropzoneStyles}>
					<input {...getInputProps()} />
					<Typography variant="h6">Drag & Drop Image Here</Typography>
					<Typography variant="body2" color="textSecondary">
						or click to select a file
					</Typography>
				</div>

				{selectedImage && (
					<div style={{ marginTop: "20px" }}>
						<Typography variant="subtitle1">
							Selected Image:
						</Typography>
						<Typography variant="body2">
							{selectedImage.name}
						</Typography>
					</div>
				)}
			</CardContent>
		</Card>
	);
};

const dropzoneStyles: React.CSSProperties = {
	border: "2px dashed #aaa",
	borderRadius: "4px",
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	padding: "20px",
	textAlign: "center",
	cursor: "pointer",
};

export default ImageDropzone;

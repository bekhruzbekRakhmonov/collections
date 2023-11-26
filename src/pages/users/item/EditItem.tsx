import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { usersApi } from "../../../utils/api/users";
import { Button, Card, Container, FormControl, FormLabel, TextField, Typography } from "@mui/material";
import { IRowItem } from "../../../utils/interfaces/item";
import Tags from "../../../components/users/collections/create/utils/Tags";
import { useAuth } from "../../../auth/AuthContext";
import ErrorComponent from "../../../components/error/Error";

interface EditItemProps {}

const EditItem: React.FC<EditItemProps> = () => {
	const { id } = useParams();
	const navigate = useNavigate();

    const {user} = useAuth();
    
	const [item, setItem] = useState<IRowItem | null>(null);
    const [tags, setTags] = useState<string[]>([]);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IRowItem>();

    const handleTagsChange = (tags: string[], itemIndex: number) => {
        setTags(tags);
    };

	useEffect(() => {
		const fetchItem = async () => {
			try {
				const data = await usersApi.getItem(String(id));
				setItem(data);
                setTags(data?.tags?.split(","));
			} catch (error) {
				console.error("Error fetching item:", error);
			}
		};

		fetchItem();
	}, [id]);

	const onSubmit: SubmitHandler<IRowItem> = async (data) => {
		try {
			await usersApi.updateItem(String(id), {...data, tags: tags.join(",")});
			navigate(`/show-item/${id}`);
		} catch (error) {
			console.error("Error updating item:", error); 
		}
	};

    const hasAccess =
		!item || !user || (item.owner?.id !== user.id && user.role !== "admin");
	if (hasAccess) {
		return (
			<ErrorComponent
				show={!hasAccess}
				errorMessage={"Something went wrong"}
			/>
		);
	}

	return (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				marginTop: "20px",
			}}
		>
			<Card sx={{ minWidth: "320px", padding: "10px" }}>
				<Typography variant="h4" gutterBottom>
					Edit Item
				</Typography>
				<form onSubmit={handleSubmit(onSubmit)}>
					<FormControl fullWidth>
						<FormLabel>Name</FormLabel>
						<TextField
							fullWidth
							value={item?.name || ""}
							{...register("name", {
								required: "Name is required",
							})}
							error={!!errors.name}
							helperText={errors.name?.message}
						/>
					</FormControl>
					<Tags
						tags={tags}
						onTagsChange={handleTagsChange}
						itemIndex={Number(item?.id)}
					/>

					{item?.custom_fields?.map((field) => (
						<FormControl fullWidth>
							<FormLabel>{field.name}</FormLabel>
							<TextField
								fullWidth
								value={field.value || ""}
								{...register("name", {
									required: `${field.name} is required`,
								})}
								error={!!errors.name}
								helperText={errors.name?.message}
							/>
						</FormControl>
					))}
					<div>
						<br />
						<Button
							type="submit"
							variant="contained"
							color="primary"
                            fullWidth
						>
							Update Item
						</Button>
					</div>
				</form>
			</Card>
		</div>
	);
};

export default EditItem;

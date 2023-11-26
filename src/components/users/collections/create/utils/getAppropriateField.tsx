import { SelectChangeEvent, FormControl, FormLabel, TextField } from "@mui/material";

const getAppropriateField = (
	id: string,
	index: number,
	name: string,
	type: string,
	value: string,
	handleInputChange: (
		index: number,
		e:
			| React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
			| SelectChangeEvent<string>
	) => void
): React.ReactNode => {
	switch (type) {
		case "multiline":
			return (
				<FormControl fullWidth>
					<FormLabel>{name}</FormLabel>
					<TextField
						required
						fullWidth
						multiline
						id={id}
						name={name}
						onChange={(
							e: React.ChangeEvent<
								HTMLInputElement | HTMLTextAreaElement
							>
						) => handleInputChange(index, e)}
						value={value}
					/>
				</FormControl>
			);
		case "string":
			return (
				<FormControl fullWidth>
					<FormLabel>{name}</FormLabel>
					<TextField
						required
						fullWidth
						id={id}
						name={name}
						value={value}
						onChange={(
							e: React.ChangeEvent<
								HTMLInputElement | HTMLTextAreaElement
							>
						) => handleInputChange(index, e)}
					/>
				</FormControl>
			);
		case "integer":
			return (
				<FormControl fullWidth>
					<FormLabel>{name}</FormLabel>
					<TextField
						required
						fullWidth
						type="number"
						id={id}
						name={name}
						value={value}
						onChange={(
							e: React.ChangeEvent<
								HTMLInputElement | HTMLTextAreaElement
							>
						) => handleInputChange(index, e)}
					/>
				</FormControl>
			);
		case "date":
			return (
				<FormControl>
					<FormLabel>{name}</FormLabel>
					<TextField
						required
						fullWidth
						type="date"
						id={id}
						name={name}
						value={value}
						onChange={(
							e: React.ChangeEvent<
								HTMLInputElement | HTMLTextAreaElement
							>
						) => handleInputChange(index, e)}
					/>
				</FormControl>
			);
		case "boolean":
			return (
				<FormControl>
					<FormLabel>{name}</FormLabel>
					<TextField
						fullWidth
						type="checkbox"
						id={id}
						name={name}
						value={value == "false" ? true : false}
						onChange={(
							e: React.ChangeEvent<
								HTMLInputElement | HTMLTextAreaElement
							>
						) => handleInputChange(index, e)}
					/>
				</FormControl>
			);
		default:
			return (
				<FormControl>
					<FormLabel>{name}</FormLabel>
					<TextField
						required
						fullWidth
						id={id}
						label={name}
						name={name}
						value={value}
						onChange={(
							e: React.ChangeEvent<
								HTMLInputElement | HTMLTextAreaElement
							>
						) => handleInputChange(index, e)}
					/>
				</FormControl>
			);
	}
};

export default getAppropriateField;
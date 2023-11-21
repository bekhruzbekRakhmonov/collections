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
				<TextField
					required
					fullWidth
					multiline
					id={id}
					label={name}
					name={name}
					onChange={(
						e: React.ChangeEvent<
							HTMLInputElement | HTMLTextAreaElement
						>
					) => handleInputChange(index, e)}
					value={value}
				/>
			);
		case "string":
			return (
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
			);
		case "integer":
			return (
				<TextField
					required
					fullWidth
					type="number"
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
			);
		case "date":
			return (
				<TextField
					required
					fullWidth
					type="date"
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
			);
		case "boolean":
			return (
				<TextField
					fullWidth
					required
					type="checkbox"
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
			);
		default:
			return (
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
			);
	}
};

export default getAppropriateField;
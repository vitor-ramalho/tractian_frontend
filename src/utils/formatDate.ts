export function formatDate(timestamp: string): string {
	const date = new Date(timestamp);
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();

	// Add leading zero to month and day if needed
	const formattedMonth = month < 10 ? `0${month}` : `${month}`;
	const formattedDay = day < 10 ? `0${day}` : `${day}`;

	return `${formattedMonth}/${formattedDay}/${year}`;
}

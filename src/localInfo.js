export const timeTable = [
	{
		day: 1,
		subjects: [
			{ name: 'CA', startTime: '09:30', endTime: '11:00', room: 'B202' },
			{ name: 'DM', startTime: '11:00', endTime: '12:30', room: 'B209' },
		],
	},
	{
		day: 2,
		subjects: [
			{ name: 'AE', startTime: '11:00', endTime: '12:30', room: 'A308' },
			{ name: 'DM', startTime: '14:00', endTime: '15:30', room: 'A203' },
			{ name: 'H1', startTime: '15:30', endTime: '17:00', room: 'B101' },
		],
	},
	{
		day: 3,
		subjects: [
			{ name: 'SP', startTime: '9:30', endTime: '11:00', room: 'A202' },
			{ name: 'DLC', startTime: '11:00', endTime: '12:30', room: 'B210' },
		],
	},
	{
		day: 4,
		subjects: [
			{ name: 'SP', startTime: '9:30', endTime: '11:00', room: 'A202' },
			{ name: 'AE', startTime: '12:30', endTime: '14:00', room: 'A407' },
			{ name: 'BK', startTime: '14:30', endTime: '16:30', room: 'B208' },
		],
	},
	{
		day: 5,
		subjects: [
			{ name: 'CA', startTime: '14:00', endTime: '15:30', room: 'B209' },
			{ name: 'DLC', startTime: '15:30', endTime: '17:00', room: 'B201' },
		],
	},
]

export const subjects = ['AE', 'BK', 'SP', 'CA', 'DM', 'H1', 'DLC']

export default { timeTable, subjects }

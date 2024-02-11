import React from 'react'
import { timeTable } from '../../../../localInfo.js'
import styles from './TimeTable.module.sass'
export const TimeTable = () => {
	const day = new Date().getDay()
	const dayToText = day => {
		switch (day) {
			case 1:
				return 'Monday'
				break
			case 2:
				return 'Tuesday'
				break
			case 3:
				return 'Wednesday'
				break
			case 4:
				return 'Thursday'
				break
			case 5:
				return 'Friday'
				break
			case 6:
				return 'Saturday'
				break
			case 0:
				return 'Sunday'
				break
		}
	}

	return (
		<div className={styles.timeTable}>
			<h2>Time table</h2>
			{day === 6 && (
				<div className={styles.wrapper}>
					<h3>Homework day</h3>
				</div>
			)}
			{day === 0 && (
				<div className={styles.wrapper}>
					<h3>Homework day</h3>
				</div>
			)}
			{timeTable.map(
				table =>
					table.day === day ||
					(table.day === day + 1 && (
						<div className={styles.wrapper} key={table.day}>
							<h3>{dayToText(table.day)}</h3>
							<ul>
								{table.subjects.map(subject => (
									<li key={subject.name}>
										{subject.name} -
										<span className={styles.neonText}> {subject.room} </span> -
										<span className={styles.timeText}>
											{' '}
											{subject.startTime}{' '}
										</span>
									</li>
								))}
							</ul>
						</div>
					))
			)}
		</div>
	)
}

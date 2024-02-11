import { Clock } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import styles from './WorldTime.module.sass'
export const WorldTime = () => {
	const [date, setDate] = useState(new Date())
	const [citiesForTime, setCitiesForTime] = useState([
		{
			city: 'Moscow',
			GMT: 3,
			time: `${date.getUTCHours() + 5}:${
				date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
			}:${date.getSeconds()}`,
		},
		{
			city: 'London',
			GMT: 0,
			time: `${date.getUTCHours()}:${
				date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
			}:${date.getSeconds()}`,
		},
		{
			city: 'Seoul',
			GMT: 9,
			time: `${date.getUTCHours() + 9}:${
				date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
			}:${date.getSeconds()}`,
		},
	])

	useEffect(() => {
		setCitiesForTime(
			citiesForTime.map(cityItem => ({
				...cityItem,
				time: `${
					date.getUTCHours() + cityItem.GMT > 23
						? date.getUTCHours() + cityItem.GMT - 24
						: date.getUTCHours() + cityItem.GMT
				}:${
					date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
				}:${
					date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()
				}`,
			}))
		)
	}, [date])

	useEffect(() => {
		const interval = setInterval(() => {
			setDate(new Date())
		}, 1000)

		return () => clearInterval(interval)
	}, [])

	return (
		<div className={styles.worldTime}>
			<h2>World Time</h2>
			{citiesForTime.map(city => (
				<div key={city.city} className={styles.city}>
					<Clock className={styles.timeIcon}></Clock>
					<span className={styles.cityTime}>{city.time}</span>
					<span className={styles.cityName}>{city.city}</span>
				</div>
			))}
		</div>
	)
}

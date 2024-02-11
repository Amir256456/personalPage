import annyang from 'annyang'
import axios from 'axios'
import {
	Cloud,
	CloudFog,
	CloudRain,
	CloudSnow,
	CloudSun,
	Droplets,
	MoveDown,
	MoveLeft,
	MoveRight,
	MoveUp,
	Sun,
	Sunrise,
	Sunset,
	Wind,
} from 'lucide-react'
import React, { useEffect, useState } from 'react'
import styles from './Weather.module.sass'
export const Weather = () => {
	const [currentWeather, setCurrentWeather] = useState({})
	const [todayWeather, setTodayWeather] = useState([])
	const [futureWeather, setFutureWeather] = useState([])

	const getWeather = async () => {
		const latitude = 41.2646
		const longitude = 69.2163
		try {
			const response = await axios.get(
				`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${latitude},${longitude}?key=MU8BXYNMG9558W64J2G237DRS`
			)

			const data = response.data
			setCurrentWeather(data.currentConditions)
			setTodayWeather(
				data.days[0].hours.filter(
					hour =>
						Number(hour.datetime.slice(0, 2)) > new Date().getHours() &&
						Number(hour.datetime.slice(0, 2)) % 2 != 0 &&
						hour
				)
			)
			setFutureWeather(data.days.slice(1, 8))
		} catch (error) {
			console.error('Error fetching weather:', error)
		}
	}

	const speak = text => {
		const utterance = new SpeechSynthesisUtterance(text)
		speechSynthesis.speak(utterance)
	}

	useEffect(() => {
		getWeather()
	}, [])

	useEffect(() => {
		if (Object.keys(currentWeather).length !== 0) {
			if (annyang) {
				annyang.addCommands({
					'current Weather': () => {
						const getWindDirection = () => {
							if (currentWeather.winddir >= 315 || currentWeather.winddir <= 45)
								return 'Северный'
							if (currentWeather.winddir > 45 && currentWeather.winddir <= 135)
								return 'Восточный'
							if (currentWeather.winddir > 135 && currentWeather.winddir <= 225)
								return 'Южный'
							if (currentWeather.winddir > 225 && currentWeather.winddir <= 315)
								return 'Западный'
						}

						const getTemp = () => Math.round((currentWeather.temp - 32) / 1.8)

						speak(
							`${getTemp()} градусов. Ветер ${getWindDirection()}, ${Math.round(
								currentWeather.windspeed * 0.44704
							)} метров в секунду.`
						)
					},
					'today Weather': () => {
						const getTemp = temp => Math.round((Number(temp) - 32) / 1.8)
						const noon = todayWeather.filter(
							weather =>
								Number(weather.datetime.slice(0, 2)) === 13 ||
								(Number(weather.datetime.slice(0, 2)) === 14 && weather)
						)

						const afternoon = todayWeather.filter(
							weather =>
								Number(weather.datetime.slice(0, 2)) === 18 ||
								(Number(weather.datetime.slice(0, 2)) === 19 && weather)
						)

						speak(
							`Температура днем ${getTemp(
								noon[0].temp
							)}. Температура вечером ${getTemp(afternoon[0].temp)}`
						)
					},
				})

				annyang.addCallback('result', phrases => {
					console.log('Recognized:', phrases)
				})

				annyang.start()
			}

			return () => {
				if (annyang) {
					annyang.abort()
				}
			}
		}
	}, [currentWeather])

	const chooseIcon = icon => {
		if (icon === 'clear-day' || icon === 'clear-night')
			return <Sun className={styles.sunIcon}></Sun>
		if (icon === 'partly-cloudy-day' || icon === 'partly-cloudy-night')
			return <CloudSun className={styles.cloudySun}></CloudSun>
		if (icon === 'cloudy' || icon === 'wind')
			return <Cloud className={styles.cloudyIcon}></Cloud>
		if (icon.includes('rain'))
			return <CloudRain className={styles.rainIcon}></CloudRain>
		if (icon.includes('snow'))
			return <CloudSnow className={styles.snowIcon}></CloudSnow>
		if (icon.includes('fog'))
			return <CloudFog className={styles.cloudyFog}></CloudFog>
	}

	return (
		Object.keys(currentWeather).length !== 0 && (
			<div className={styles.weather}>
				<h2>Weather</h2>
				<div className={styles.property}>
					{chooseIcon(currentWeather.icon)}
					<span className={styles.value}>
						{Math.round((currentWeather.temp - 32) / 1.8)}
					</span>
					<span className={styles.symbol}>°C</span>
				</div>
				<div className={styles.property}>
					<Wind className={styles.windIcon}></Wind>
					<span className={styles.value}>
						{Math.round(currentWeather.windspeed * 0.44704)}
					</span>
					<span className={styles.symbol}>m/s</span>
					<span className={styles.direction}>
						{currentWeather.winddir >= 315 || currentWeather.winddir <= 45 ? (
							<MoveUp></MoveUp>
						) : currentWeather.winddir > 45 && currentWeather.winddir <= 135 ? (
							<MoveRight></MoveRight>
						) : currentWeather.winddir > 135 &&
						  currentWeather.winddir <= 225 ? (
							<MoveDown></MoveDown>
						) : (
							<MoveLeft></MoveLeft>
						)}
					</span>
					<Droplets className={styles.dropletsIcon}></Droplets>
					<span className={styles.value}>{currentWeather.humidity}%</span>
				</div>
				<div className={styles.sun}>
					<Sunrise className={styles.sunIcon}></Sunrise>
					<span className={styles.sun}>
						{currentWeather.sunrise.slice(0, 5)}
					</span>
					<hr />
					<span className={styles.sun}>
						{currentWeather.sunset.slice(0, 5)}
					</span>
					<Sunset className={styles.sunIcon}></Sunset>
				</div>
				<div className={styles.wrapper} onScroll={e => e.stopPropagation()}>
					{todayWeather.slice(0, 7).map(hourWeather => (
						<div key={hourWeather.datetime} className={styles.item}>
							<h4>{hourWeather.datetime.slice(0, 5)}</h4>
							{chooseIcon(hourWeather.icon)}
							<span className={styles.value}>
								{Math.round((hourWeather.temp - 32) / 1.8)}
								<span className={styles.symbol}>°C</span>
							</span>
						</div>
					))}
				</div>
				<div className={styles.wrapper} onScroll={e => e.stopPropagation()}>
					{futureWeather.map(dayWeather => (
						<div key={dayWeather.datetime} className={styles.item}>
							<h4>{dayWeather.datetime.slice(-2)}</h4>
							{chooseIcon(dayWeather.icon)}
							<span className={styles.value}>
								{Math.round((dayWeather.temp - 32) / 1.8)}
								<span className={styles.symbol}>°C</span>
							</span>
						</div>
					))}
				</div>
			</div>
		)
	)
}

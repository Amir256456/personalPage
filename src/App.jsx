import { useEffect, useRef, useState } from 'react'
import { useSwipeable } from 'react-swipeable'
import { General } from './components/General/General'
import { Information } from './components/Information/Information'
import { Study } from './components/Study/Study'
import styles from './styles/App.module.sass'
function App() {
	const [visibleTabs, setVisibleTabs] = useState([])

	const windowWidth = useRef(window.innerWidth)

	useEffect(() => {
		if (windowWidth.current >= 1200) return setVisibleTabs([1, 2, 3])

		const date = new Date()

		if (windowWidth.current < 800) {
			let hour = date.getHours()
			let minutes = date.getMinutes()
			if (date.getDay() === 1 || date.getDay() === 3) {
				switch ((hour, minutes)) {
					case (hour === 8 && minutes < 20) || (hour === 7 && minutes > 45):
						return setVisibleTabs([1])
						break
					case (hour === 9 && minutes > 20) ||
						(hour > 9 && hour < 12) ||
						(hour === 12 && minutes < 30):
						return setVisibleTabs([2])
						break
				}
			}

			if (date.getDay() === 4) {
				switch ((hour, minutes)) {
					case (hour === 8 && minutes < 20) || (hour === 7 && minutes > 45):
						return setVisibleTabs([1])
						break
					case (hour === 9 && minutes > 20) || (hour === 10 && minutes < 50):
						return setVisibleTabs([2])
						break
					case (hour === 12 && minutes > 20) || (hour === 13 && minutes < 50):
						return setVisibleTabs([2])
						break
					case (hour === 14 && minutes > 20) ||
						hour === 15 ||
						(hour === 16 && minutes < 20):
						return setVisibleTabs([2])
						break
				}
			}

			if (date.getDay() === 2) {
				switch ((hour, minutes)) {
					case hour === 9 && minutes < 50:
						return setVisibleTabs([1])
						break
					case hour === 11 || (hour === 12 && minutes < 20):
						return setVisibleTabs([2])
						break
					case hour >= 14 && hour < 17:
						return setVisibleTabs([2])
						break
				}
			}
			if (date.getDay() === 5) {
				switch ((hour, minutes)) {
					case hour === 12 && minutes < 45:
						return setVisibleTabs([1])
						break
					case hour >= 14 && hour < 17:
						return setVisibleTabs([2])
						break
				}
			}

			setVisibleTabs([3])
		}

		if (windowWidth.current < 1200 && windowWidth.current >= 800) {
			let hour = date.getHours()
			if (date.getDay() === 1 || date.getDay() === 3 || date.getDay() === 4) {
				switch (hour) {
					case hour < 8:
						return setVisibleTabs([2, 3])
						break
					case hour === 8:
						return setVisibleTabs([1, 2])
						break
				}
			}

			if (date.getDay() === 2) {
				switch (hour) {
					case hour < 9:
						return setVisibleTabs([2, 3])
						break
					case hour === 9:
						return setVisibleTabs([1, 2])
						break
				}
			}

			if (date.getDay() === 5) {
				switch (hour) {
					case hour > 10 && hour < 12:
						return setVisibleTabs([1, 2])
						break
				}
			}

			setVisibleTabs([2, 3])
		}
	}, [])

	const rihgtHandler = useSwipeable({
		onSwipedRight: eventData => {
			setVisibleTabs([visibleTabs.unshift(visibleTabs[0] - 1)])
			setVisibleTabs(
				visibleTabs.filter(
					visibleTab => visibleTab !== visibleTabs[visibleTabs.length - 1]
				)
			)
		},
	})

	const leftHandler = useSwipeable({
		onSwipedLeft: eventData => {
			setVisibleTabs([
				visibleTabs.push(visibleTabs[visibleTabs.length - 1] + 1),
			])
			setVisibleTabs(
				visibleTabs.filter(visibleTab => visibleTab !== visibleTabs[0])
			)
		},
	})

	const middleHandler = useSwipeable({
		onSwipedRight: eventData => {
			if (visibleTabs[visibleTabs.length - 1] === 3 && visibleTabs[0] === 1)
				return
			setVisibleTabs([visibleTabs.unshift(visibleTabs[0] - 1)])
			setVisibleTabs(
				visibleTabs.filter(
					visibleTab => visibleTab !== visibleTabs[visibleTabs.length - 1]
				)
			)
		},
		onSwipedLeft: eventData => {
			setVisibleTabs([
				visibleTabs.push(visibleTabs[visibleTabs.length - 1] + 1),
			])
			setVisibleTabs(
				visibleTabs.filter(visibleTab => visibleTab !== visibleTabs[0])
			)
		},
	})

	return (
		<div className={styles.wrapper}>
			{visibleTabs?.includes(1) && (
				<div className={styles.item} {...leftHandler}>
					<General></General>
				</div>
			)}
			{visibleTabs?.includes(2) && (
				<div className={styles.item} {...middleHandler}>
					<Study></Study>
				</div>
			)}
			{visibleTabs?.includes(3) && (
				<div className={styles.item} {...rihgtHandler}>
					<Information></Information>
				</div>
			)}
		</div>
	)
}

export default App

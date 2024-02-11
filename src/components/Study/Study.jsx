import axios from 'axios'
import { ChevronDown, ChevronUp, Plus } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Form } from '../Layout/Form/Form'
import styles from './Study.module.sass'
export const Study = () => {
	const [time, setTime] = useState('')
	const [date, setDate] = useState(new Date())
	const [isNotificationVisible, setNotificationVisible] = useState(false)
	const [isDeadlineVisible, setDeadlineVisible] = useState(false)
	const [addingType, setAddingType] = useState('')
	const [allNotifications, setAllNotifications] = useState([])
	const [allDeadlines, setAllDeadlines] = useState([])
	const [todayTasks, setTodayTasks] = useState([])

	useEffect(() => {
		setTime(
			`${date.getHours()}:${
				date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
			}:${date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()}`
		)
	}, [date])

	useEffect(() => {
		const interval = setInterval(() => {
			setDate(new Date())
		}, 1000)

		return () => clearInterval(interval)
	}, [])

	const getAllNotifications = async () => {
		const response = await axios.get(
			'https://tasker-backend.vercel.app/api/getAllNotifications'
		)
		const data = response.data.data
		const sortedAsc = data.sort((objA, objB) =>
			Number(
				new Date(objA.expireAt.slice(0, -1)) -
					Number(new Date(objB.expireAt.slice(0, -1)))
			)
		)
		setAllNotifications(sortedAsc)
	}

	const getAllDeadlines = async () => {
		const response = await axios.get(
			'https://tasker-backend.vercel.app/api/getAllDeadLines'
		)
		const data = response.data.data
		const sortedAsc = data.sort((objA, objB) =>
			Number(
				new Date(objA.expireAt.slice(0, -1)) -
					Number(new Date(objB.expireAt.slice(0, -1)))
			)
		)
		setAllDeadlines(sortedAsc)
	}
	const getTodayTasks = async () => {
		const response = await axios.get(
			'https://tasker-backend.vercel.app/api/getTodayTasks'
		)
		const data = response.data.data
		const todayDate = new Date().getDate()
		const todayDay = new Date().getDay()
		let todaysTasks = []
		if (todayDate === 1) {
			todaysTasks = data.filter(
				dat => dat.subject === 'CA' && dat.subject === 'DM'
			)
		}
		if (todayDay === 2) {
			todaysTasks = data.filter(
				dat => dat.subject === 'SP' && dat.subject === 'H1'
			)
		}
		if (todayDay === 3) {
			todaysTasks = data.filter(
				dat => dat.subject === 'DM' && dat.subject === 'SP'
			)
		}
		if (todayDay === 4) {
			todaysTasks = data.filter(dat => dat.subject === 'H1')
		}
		if (todayDay === 5) {
			todaysTasks = data.filter(
				dat =>
					dat.subject === 'CA' && dat.subject === 'DLC' && dat.subject === 'BK'
			)
		}
		if (todayDay === 6) {
			todaysTasks = data.filter(
				dat =>
					dat.subject === 'H1' && dat.subject === 'DM' && dat.subject === 'SP'
			)
		}
		if (todayDay === 0) {
			todaysTasks = data.filter(
				dat =>
					dat.subject === 'CA' &&
					dat.subject === 'AE' &&
					dat.subject === 'DLC' &&
					dat.subject === 'BK'
			)
		}

		setTodayTasks(
			todaysTasks.filter(task =>
				task.showDate.filter(
					dateItem => new Date(dateItem).getDate() === todayDate
				)
			)
		)
	}

	useEffect(() => {
		getAllNotifications()
		getAllDeadlines()
		getTodayTasks()
	}, [])

	return (
		<div className={styles.study}>
			<h1>{time}</h1>
			<div className={styles.actionBar}>
				<button
					className={styles.addNotification}
					onClick={() => setAddingType('notification')}
				>
					<Plus></Plus>
				</button>
				<button
					className={styles.addDeadline}
					onClick={() => setAddingType('deadline')}
				>
					<Plus></Plus>
				</button>
				<button
					className={styles.addRepetition}
					onClick={() => setAddingType('repetition')}
				>
					<Plus></Plus>
				</button>
			</div>

			{addingType === 'notification' && <Form type={'notification'}></Form>}
			{addingType === 'deadline' && <Form type={'deadline'}></Form>}
			{addingType === 'repetition' && <Form type={'repetition'}></Form>}

			<div
				onClick={() => setNotificationVisible(!isNotificationVisible)}
				className={`${isNotificationVisible && styles.visible} ${
					styles.wrapper
				} ${styles.notificationWrapper}`}
			>
				<div className={styles.headline}>
					<h3 className={styles.notificationHeadline}>Notification</h3>
					{isNotificationVisible ? (
						<ChevronUp className={styles.arrow}></ChevronUp>
					) : (
						<ChevronDown className={styles.arrow}></ChevronDown>
					)}
				</div>

				{allNotifications.map(notification => (
					<div key={notification._id} className={styles.item}>
						<span className={styles.subject}>{notification.subject}</span>
						<span
							className={`${styles.description} ${styles.notificationDescription}`}
						>
							{notification.description}
						</span>
						<span className={styles.date}>
							{notification.expireAt.substring(8, 10)}.
							{notification.expireAt.substring(5, 7)}
						</span>
					</div>
				))}
			</div>

			<div
				onClick={() => setDeadlineVisible(!isDeadlineVisible)}
				className={`${isDeadlineVisible && styles.visible} ${styles.wrapper} ${
					styles.deadlineWrapper
				}`}
			>
				<div className={styles.headline}>
					<h3 className={styles.deadlineHeadline}>Deadline</h3>
					{isDeadlineVisible ? (
						<ChevronUp className={styles.arrow}></ChevronUp>
					) : (
						<ChevronDown className={styles.arrow}></ChevronDown>
					)}
				</div>

				{allDeadlines.map(deadline => (
					<div key={deadline._id} className={styles.item}>
						<span className={styles.subject}>{deadline.subject}</span>
						<span
							className={`${styles.description} ${styles.deadlineDescription}`}
						>
							{deadline.description}
						</span>
						<span className={styles.date}>
							{deadline.expireAt.substring(8, 10)}.
							{deadline.expireAt.substring(5, 7)}{' '}
							{Number(deadline.expireAt.substring(11, 13)) + 5} :{' '}
							{deadline.expireAt.substring(14, 16)}
						</span>
					</div>
				))}
			</div>

			<h2>Repetition</h2>

			{todayTasks.map(task => (
				<div className={styles.repetitionItem} key={task.agenda}>
					<div className={styles.headline}>
						<h3>{task.subject}</h3>
						<span>{task.agenda}</span>
					</div>
					<div className={styles.link}>{task.link}</div>
					<div className={styles.description}>{task.description}</div>
				</div>
			))}
		</div>
	)
}

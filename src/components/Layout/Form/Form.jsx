import axios from 'axios'
import React, { useState } from 'react'
import { Select } from '../../UI/Select/Select'
import styles from './Form.module.sass'

export const Form = ({ type }) => {
	const [selectedSubject, setSelectedSubject] = useState('')
	const [description, setDescription] = useState('')
	const [date, setDate] = useState('')
	const [time, setTime] = useState('')
	const [link, setLink] = useState('')
	const [agenda, setAgenda] = useState('')

	const updateSelectedSubject = selected => {
		setSelectedSubject(selected)
	}

	const handleNotificationSubmit = async e => {
		e.preventDefault()
		const expireAt = `${date}T${time}:00.000Z`

		const config = {
			headers: {
				'Content-Type': 'application/json', // or any other content type you need
			},
		}

		await axios.post(
			'https://tasker-backend.vercel.app/api/addNotification',
			{
				description: description,
				subject: selectedSubject,
				expireAt: expireAt,
			},
			config
		)
		setDescription('')
	}

	const handleDeadlineSubmit = async e => {
		e.preventDefault()
		const expireAt = new Date()

		expireAt.setDate(date.substring(8, 10))
		console.log(time.substring(0, 2))
		expireAt.setHours(time.substring(0, 2))
		expireAt.setMinutes(time.substring(3, 5))
		console.log(expireAt)
		const config = {
			headers: {
				'Content-Type': 'application/json', // or any other content type you need
			},
		}

		const response = await axios.post(
			'https://tasker-backend.vercel.app/api/addDeadline',
			{
				description: description,
				subject: selectedSubject,
				expireAt: expireAt,
			},
			config
		)
		console.log(response)
		setDescription('')
	}

	const handleRepetitionSubmit = async e => {
		e.preventDefault()
		const expireAt = new Date()
		expireAt.setDate(new Date().getDate() + (8 - new Date().getDay()))
		expireAt.setHours('00')
		expireAt.setMinutes('00')

		let showDate = [new Date(), new Date()]

		if (new Date().getDay() === 1) {
			if (subject === 'CA') {
				showDate[1].setDate(new Date().getDate() + (7 - new Date().getDay()))
			}
			if (subject === 'DM') {
				showDate[1].setDate(new Date().getDate() + (6 - new Date().getDay()))
			}
		}

		if (new Date().getDay() === 2) {
			if (subject === 'AE') {
				showDate[1].setDate(new Date().getDate() + (7 - new Date().getDay()))
			}
			if (subject === 'DM') {
				showDate[1].setDate(new Date().getDate() + 1)
				showDate[2].setDate(new Date().getDate() + (6 - new Date().getDay()))
			}
			if (subject === 'H1') {
				showDate[1].setDate(new Date().getDate() + 2)
				showDate[2].setDate(new Date().getDate() + (6 - new Date().getDay()))
			}
		}

		if (new Date().getDay() === 3) {
			if (subject === 'SP') {
				showDate[1].setDate(new Date().getDate() + (6 - new Date().getDay()))
			}
			if (subject === 'DLC') {
				showDate[1].setDate(new Date().getDate() + 2)
				showDate[2].setDate(new Date().getDate() + (7 - new Date().getDay()))
			}
		}

		if (new Date().getDay() === 4) {
			if (subject === 'SP') {
				showDate[1].setDate(new Date().getDate() + (6 - new Date().getDay()))
			}
			if (subject === 'AE') {
				showDate[2].setDate(new Date().getDate() + (7 - new Date().getDay()))
			}
			if (subject === 'BK') {
				showDate[1].setDate(new Date().getDate() + 1)
				showDate[2].setDate(new Date().getDate() + (7 - new Date().getDay()))
			}
		}

		if (new Date().getDay() === 5) {
			if (subject === 'CA') {
				showDate[1].setDate(new Date().getDate() + (7 - new Date().getDay()))
			}
			if (subject === 'DLC') {
				showDate[2].setDate(new Date().getDate() + (7 - new Date().getDay()))
			}
		}

		const config = {
			headers: {
				'Content-Type': 'application/json', // or any other content type you need
			},
		}

		console.log(agenda, description, showDate, expireAt, link)

		const response = await axios.post(
			'https://tasker-backend.vercel.app/api/addTask',
			{
				agenda: agenda,
				description: description,
				link: link,
				showDate: showDate,
				subject: selectedSubject,
				expireAt: expireAt,
			},
			config
		)
		console.log(response)
		setDescription('')
	}
	return type === 'notification' || type === 'deadline' ? (
		<form
			onSubmit={e =>
				type === 'notification'
					? handleNotificationSubmit(e)
					: handleDeadlineSubmit(e)
			}
		>
			<Select
				type={type}
				updateSelectedSubject={updateSelectedSubject}
			></Select>
			<input
				type='text'
				placeholder='description'
				className={`${
					type === 'notification'
						? styles.notificationInput
						: styles.deadlineInput
				}`}
				value={description}
				onChange={e => setDescription(e.target.value)}
			/>

			<input
				type='date'
				placeholder=''
				className={`${
					type === 'notification'
						? styles.notificationInput
						: styles.deadlineInput
				}`}
				value={date}
				onChange={e => setDate(e.target.value)}
			/>
			<input
				type='time'
				placeholder=''
				className={`${
					type === 'notification'
						? styles.notificationInput
						: styles.deadlineInput
				}`}
				value={time}
				onChange={e => setTime(e.target.value)}
			/>

			<button
				className={`${
					type === 'notification'
						? styles.notificationButton
						: styles.deadlineButton
				}`}
			>
				Add
			</button>
		</form>
	) : (
		type === 'repetition' && (
			<form onSubmit={e => handleRepetitionSubmit(e)}>
				<Select
					type={type}
					updateSelectedSubject={updateSelectedSubject}
				></Select>
				<input
					type='text'
					placeholder='agenda'
					className={styles.repetitionInput}
					value={agenda}
					onChange={e => setAgenda(e.target.value)}
				/>
				<input
					type='text'
					placeholder='description'
					className={styles.repetitionInput}
					value={description}
					onChange={e => setDescription(e.target.value)}
				/>

				<input
					type='text'
					placeholder='link'
					className={styles.repetitionInput}
					value={link}
					onChange={e => setLink(e.target.value)}
				/>

				<button className={styles.repetitionButton}>Add</button>
			</form>
		)
	)
}

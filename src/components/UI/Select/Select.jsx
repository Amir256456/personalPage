import { ChevronDown, ChevronUp } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { subjects } from '../../../localInfo.js'
import styles from './Select.module.sass'
export const Select = ({ type, updateSelectedSubject }) => {
	const [isSelectOpen, setSelectOpen] = useState(false)
	const [selected, setSelected] = useState('BK')

	useEffect(() => {
		updateSelectedSubject(selected)
	}, [selected])

	return (
		<div
			className={`${styles.select} ${
				type === 'notification'
					? styles.notificationSelect
					: type === 'deadline'
					? styles.deadlineSelect
					: styles.repetitionSelect
			} ${isSelectOpen && styles.visible}`}
			onClick={() => {
				setSelectOpen(!isSelectOpen)
			}}
		>
			<div className={styles.selected}>
				<> {selected}</>

				{isSelectOpen ? (
					<ChevronUp className={styles.arrow}></ChevronUp>
				) : (
					<ChevronDown className={styles.arrow}></ChevronDown>
				)}
			</div>
			<ul className={styles.optionList}>
				{subjects.map(subject =>
					subject.id === subjects.length - 1 ? (
						<li
							key={subject}
							onClick={() => setSelected(subject)}
							className={styles.option}
						>
							{subject}
						</li>
					) : (
						<li
							key={subject}
							onClick={() => setSelected(subject)}
							className={styles.option}
							styles={{ borderLeft: 'none' }}
						>
							{subject}
						</li>
					)
				)}
			</ul>
		</div>
	)
}

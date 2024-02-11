import React, { useEffect, useRef, useState } from 'react'
import bingIcon from '../../../../icons/bing.svg'
import chatGptIcon from '../../../../icons/chatGpt.svg'
import githubIcon from '../../../../icons/github.svg'
import gmailIcon from '../../../../icons/gmail.svg'
import googleIcon from '../../../../icons/google.svg'
import inhaIcon from '../../../../icons/inha.svg'
import yahooIcon from '../../../../icons/yahoo.svg'
import yandexIcon from '../../../../icons/yandex.svg'
import youtubeIcon from '../../../../icons/youtube.svg'
import Button from '../../../UI/Button/Button'
import styles from './Search.module.sass'

const searchEngines = [
	{ name: 'google', icon: googleIcon },
	{ name: 'yandex', icon: yandexIcon },
	{ name: 'yahoo', icon: yahooIcon },
	{ name: 'bing', icon: bingIcon },
]

const links = [
	{ url: 'https://chat.openai.com/', icon: chatGptIcon, name: 'Chat GPT' },
	{ url: 'https://www.youtube.com/', icon: youtubeIcon, name: 'Youtube' },
	{
		url: 'https://mail.google.com/mail/u/0/#inbox',
		icon: gmailIcon,
		name: 'Gmail',
	},
	{ url: 'https://github.com/', icon: githubIcon, name: 'Github' },
	{
		url: 'https://ins-inha-uz.translate.goog/?_x_tr_sch=http&_x_tr_sl=en&_x_tr_tl=ru&_x_tr_hl=ru&_x_tr_pto=sc',
		icon: inhaIcon,
		name: 'INS',
	},
	{
		url: 'https://eclass.inha.ac.kr/login.php',
		icon: inhaIcon,
		name: 'Eclass',
	},
]

export const Search = () => {
	const searchInput = useRef()

	useEffect(() => {
		searchInput.current.focus()
	}, [])

	const [selectedSearchEngines, setSelectedSearchEngines] = useState(['google'])

	const handleClick = searchEngine => {
		if (selectedSearchEngines.includes(searchEngine)) {
			if (selectedSearchEngines.length === 1) {
				return
			}

			setSelectedSearchEngines(
				selectedSearchEngines.filter(
					selectedSearchEngine => selectedSearchEngine !== searchEngine
				)
			)
			return
		}

		setSelectedSearchEngines([...selectedSearchEngines, searchEngine])
	}

	const [searchText, setSearchText] = useState('')

	const handleSearch = () => {
		selectedSearchEngines.includes('google') &&
			openLink(
				`https://www.google.com/search?q=${searchText.split(' ').join('+')}`
			)

		selectedSearchEngines.includes('yandex') &&
			openLink(
				`https://yandex.uz/search/?text=${searchText.split(' ').join('+')}`
			)

		selectedSearchEngines.includes('yahoo') &&
			openLink(
				`https://search.yahoo.com/search?p=${searchText.split(' ').join('+')}`
			)

		selectedSearchEngines.includes('bing') &&
			openLink(
				`https://www.bing.com/search?q=${searchText.split(' ').join('+')}`
			)
	}

	const openLink = url => {
		setSearchText('')
		window.open(url, '_blank', 'noreferrer')
	}

	return (
		<div className={styles.search}>
			<h2>Search</h2>
			<div className={styles.wrapper}>
				{searchEngines.map(searchEngine => (
					<Button
						key={searchEngine.name}
						onClick={() => handleClick(searchEngine.name)}
						className={`${
							selectedSearchEngines.includes(searchEngine.name) &&
							styles.selected
						}`}
					>
						<img src={searchEngine.icon} alt='' />
					</Button>
				))}
			</div>
			<input
				onChange={e => setSearchText(e.target.value)}
				value={searchText}
				type='text'
				placeholder='Search'
				className={styles.searchInput}
				ref={searchInput}
			/>
			<button className={styles.searchBtn} onClick={() => handleSearch()}>
				Search
			</button>
			<div className={styles.wrapper}>
				{links.map(link => (
					<Button key={link.url} onClick={() => openLink(link.url)}>
						<img src={link.icon} alt='' />
						{link.name}
					</Button>
				))}
			</div>
		</div>
	)
}

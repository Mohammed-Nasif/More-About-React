import React from 'react';
import { useTranslation } from 'react-i18next';

// Contains the value and text for the options
const languages = [
	{ value: '', text: 'Options' },
	{ value: 'en', text: 'English' },
	{ value: 'ar', text: 'Arabic' },
];

function App() {
	// It is a hook imported from 'react-i18next'
	const { t } = useTranslation();

	const lang = window.location.search.slice(-2);

	// This function put query that helps to
	// change the language
	const handleChange = (e) => {
		let loc = 'http://localhost:3000/';
		window.location.replace(loc + '?lng=' + e.target.value);
	};

	return (
		<div className='App'>
			{/* we are showing the value by using the // keys we have created in the website */}
			<h1>{t('wlcMsg')}</h1>
			<label>{t('lang')}</label>
			<select value={lang} onChange={handleChange}>
				{languages.map((item) => {
					return (
						<option key={item.value} value={item.value}>
							{item.text}
						</option>
					);
				})}
			</select>
		</div>
	);
}

export default App;

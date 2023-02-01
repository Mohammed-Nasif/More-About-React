import './App.css';
import { useDeferredValue, useEffect, useState } from 'react';
import { getSearchResults } from './api/getSearchResults';
import { useDebounceValue } from './hooks/useDebounceValue';

function App() {
  
	const [query, setQuery] = useState<string>('');

	// Start Search Without Debounce The Query Implementation
	const [searchedValues, setSearchedValues] = useState<string[]>([]);

	useEffect(() => {
		/* Here I Used IIFE Cause async function cannot be passed to useEffect Hook,
      So IIFE  unlock the potential to use async-await syntax inside the useeffect hook. 
    */

		(async () => {
			setSearchedValues([]);
			if (query.trim() !== '') {
				const searchedData = await getSearchResults(query);
				setSearchedValues(searchedData);
			}
		})();

	}, [query]);
	// End Search Without Debounce The Query Implementation

	// Start Native Debounce Implementation
	const [searchedValuesByNative, setSearchedValuesByNative] = useState<string[]>([]);
	const deboundedQuery = useDebounceValue(query);

	useEffect(() => {
		const controller = new AbortController();
		const signal = controller.signal;

		/* Here I Used IIFE Cause async function cannot be passed to useEffect Hook,
      So IIFE  unlock the potential to use async-await syntax inside the useeffect hook. 
    */

		(async () => {
			setSearchedValuesByNative([]);
			if (deboundedQuery.trim() !== '') {
				const searchedData = await getSearchResults(deboundedQuery, signal);
				setSearchedValuesByNative(searchedData);
			}
		})();

		// This Abort is Beacuse If we Already made a request which take some time more than the new one, abort the old one when the useEffect clean up
		// return () => controller.abort('Cancel Previous Request');

		// Or Another Way To Abort To use Flag

		// let ignorePrevReq = false;
		// (async () => {
		// 	setSearchedValues([]);
		// 	if (deboundedQuery.trim() !== '') {
		// 		const searchedData = await getSearchResults(deboundedQuery);
		// 		if (!ignorePrevReq) setSearchedValues(searchedData);
		// 	}
		// })();

		// // This Abort is Beacuse If we Already made a request which take some time more than the new one, abort the old one when the useEffect clean up
		// return () => {
		// 	ignorePrevReq = true;
		// };
	}, [deboundedQuery]);
	// End Native Debounce Implementation

	// Start useDeferredValue Debounce Implementation
	const [searchedValuesByHook, setSearchedValuesByHook] = useState<string[]>([]);
	const deferredQuery = useDeferredValue(query); // Here Is Just the different
	useEffect(() => {
		const controller = new AbortController();
		const signal = controller.signal;
		(async () => {
			setSearchedValuesByHook([]);
			if (deferredQuery.trim() !== '') {
				const searchedData = await getSearchResults(deferredQuery, signal);
				setSearchedValuesByHook(searchedData);
			}
		})();
		return () => controller.abort('Cancel Previous Request');
	}, [deferredQuery]);
	// End useDeferredValue Debounce Implementation

	return (
		<div className='App'>
			<header className='App-header'>
				<h1>Input Search Query</h1>
				<input type='text' value={query} onChange={(e) => setQuery(e.target.value)} />
				<hr style={{ width: '99%', marginTop: '4rem' }} />

				<div>
					<div>
						<h2>Without Debounce</h2>
						<p>Search results for : {query}</p>
						<ul>
							{searchedValues.map((value) => (
								<li key={value}>{value}</li>
							))}
						</ul>
					</div>

					<div>
						<h2>Native Debounce</h2>
						<p>Search results for : {deboundedQuery}</p>
						<ul>
							{searchedValuesByNative.map((value) => (
								<li key={value}>{value}</li>
							))}
						</ul>
					</div>

					<div>
						<h2>UsDeferredValue</h2>
						<p>Search results for : {deferredQuery}</p>
						<ul>
							{searchedValuesByHook.map((value) => (
								<li key={value}>{value}</li>
							))}
						</ul>
					</div>
				</div>
			</header>
		</div>
	);
}

export default App;

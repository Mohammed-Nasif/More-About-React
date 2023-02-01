import { useEffect, useState } from 'react';

export function useDebounceValue(value: string, time = 250): string {
	const [debounceValue, setDebounceValue] = useState<string>(value);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setDebounceValue(value);
		}, time);

		return () => {
			// At any time the value changed the useEffect Cleanup the previous timeout and set new one
			clearTimeout(timeout);
		};
	}, [value, time]);

	return debounceValue;
}

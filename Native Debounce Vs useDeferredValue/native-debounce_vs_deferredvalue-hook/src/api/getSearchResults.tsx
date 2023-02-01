export function getSearchResults(query: string, signal?: AbortSignal): Promise<string[]> {
	const fruits = [
		'Apple',
		'Banana',
		'Kiwi',
		'Orange',
		'Strawberry',
		'Watermelon',
		'Mango',
		'Grape',
		'Lemon',
		'Lime',
		'Peach',
		'Pear',
		'Raspberry',
		'Blueberry',
		'Blackberry',
		'Cherry',
		'Coconut',
		'Cranberry',
		'Cucumber',
		'Grapefruit',
		'Jackfruit',
		'Melon',
		'Pineapple',
		'Plum',
		'Tomato',
	];

	return new Promise((resolve, reject) => {
		setTimeout(() => {
            // To Abort The Previous Request If New One Is Requested
			if (signal?.aborted) {
				reject(signal.reason);
			}
			resolve(fruits.filter((fruit) => fruit.toLowerCase().includes(query.toLowerCase())));
		}, Math.random() * 1000); // This Timeout to Mock a slow API Request
	});
}

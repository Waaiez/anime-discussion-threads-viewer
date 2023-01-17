// https://blog.webdevsimplified.com/2020-07/relative-time-format/

const intlFormatter = new Intl.RelativeTimeFormat(undefined, {
	numeric: 'auto'
});

const timeDivisions = [
	{ amount: 60, name: 'seconds' },
	{ amount: 60, name: 'minutes' },
	{ amount: 24, name: 'hours' },
	{ amount: 7, name: 'days' },
	{ amount: 4.34524, name: 'weeks' },
	{ amount: 12, name: 'months' },
	{ amount: Number.POSITIVE_INFINITY, name: 'years' }
];

export const formatTimeAgo = (pasteDate: Date) => {
	const currentDate = new Date();

	let duration = (pasteDate.valueOf() - currentDate.valueOf()) / 1000;

	for (let i = 0; i <= timeDivisions.length; i++) {
		const division = timeDivisions[i];

		if (Math.abs(duration) < division!.amount) {
			return intlFormatter.format(
				Math.round(duration),
				division!.name as Intl.RelativeTimeFormatUnit
			);
		}

		duration /= division!.amount;
	}

	return intlFormatter.format(-1, 'seconds');
};

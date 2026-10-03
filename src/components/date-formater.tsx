import { tz, tzName } from '@date-fns/tz';
import { format } from 'date-fns';

interface FormatDatetimeProps extends React.ComponentProps<'span'> {
	dateObject: {
		datetimeString: string;
		formatter?: string;
		timezone?: string | 'none';
	};
}

function FormatDatetime({
	dateObject,
	...props
}: FormatDatetimeProps) {

	const date = new Date(dateObject?.datetimeString);
	const formatter = dateObject?.formatter
		? dateObject?.formatter
		: 'MM/dd/yy hh:mm aaa';
	const timezone =
		dateObject?.timezone && dateObject?.timezone !== 'none'
			? dateObject?.timezone
			: Intl.DateTimeFormat()?.resolvedOptions()?.timeZone;
	return (
		<span {...props}>
			{format(date, formatter, { in: tz(timezone) })}
			{dateObject?.timezone !== 'none' && ' '}
			{dateObject?.timezone !== 'none' && tzName(timezone, date, 'short')}
		</span>
	);
}

export { FormatDatetime };

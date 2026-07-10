import { tz, tzName } from '@date-fns/tz';
import { format } from 'date-fns';

function FormatDatetime({
	dateObject,
	elementProps,
}: {
	dateObject: {
		datetimeString: string;
		formatter?: string;
		timezone?: string | 'none';
	};
	elementProps?: React.ComponentProps<'span'>;
}) {

	const date = new Date(dateObject?.datetimeString);
	const formatter = dateObject?.formatter
		? dateObject?.formatter
		: 'MM/dd/yy hh:mm aaa';
	const timezone =
		dateObject?.timezone && dateObject?.timezone !== 'none'
			? dateObject?.timezone
			: Intl.DateTimeFormat()?.resolvedOptions()?.timeZone;
	return (
		<span {...elementProps}>
			{format(date, formatter, { in: tz(timezone) })}
			{dateObject?.timezone !== 'none' && ' '}
			{dateObject?.timezone !== 'none' && tzName(timezone, date, 'shortGeneric')}
		</span>
	);
}

export { FormatDatetime };

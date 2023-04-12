import twemoji from 'twemoji';

/**
 * Convert a text's emojis to twitter SVG emojis (chrome-aws-lambda does not support emojis)
 * @param text Any text containing unicode emojis
 * @returns Text with emojis replaced
 */
export const emojify = (text: string): string => twemoji.parse(text, { folder: 'svg', ext: '.svg' });

/**
 * Convert a date to a time ago string (e.g. 1s, 2 min, 3h, {day} {month} {year})
 * @param time
 * @returns string
 */
export const timeAgo = (time: any): string|null => {
    if (!time) return null;
    switch (typeof time) {
        case 'number':
            break;
        case 'string':
            time = +new Date(time);
            break;
        case 'object':
            if (time.constructor === Date) time = time.getTime();
            break;
        default:
            time = +new Date();
    }
    let seconds: number = (+new Date() - time) / 1000;

    if (seconds < 0) {
        return `1s`;
    }

    const date = new Date(time);
    if (seconds < 60) {
        return `${Math.floor(seconds)}s`;
    } else if (seconds < 3600) {
        const minutes = Math.floor(seconds / 60);
        return `${minutes} min`;
    } else if (seconds < 86400) {
        const hours = Math.floor(seconds / 3600);
        return `${hours} h`;
    } else if (seconds < 31536000) {
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'short' });
        return `${day} ${month}`;
    } else {
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();
        return `${day} ${month} ${year}`;
    }
}
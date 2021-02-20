export function postedDate(postDate) {
    const date = new Date(postDate);
    const month = date.getMonth();
    const monthDate = date.getDate();
    const year = date.getFullYear();

    const monthString = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',];

    const postedAt = `${monthString[month]} ${monthDate}, ${year}`
    return postedAt
};
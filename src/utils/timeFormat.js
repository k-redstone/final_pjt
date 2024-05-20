export const getTimeFormat = (date) => {
  const new_date = new Date(date)
  let month = new_date.getMonth() + 1
  let day = new_date.getDate()
  let hour = new_date.getHours()
  let minute = new_date.getMinutes()

  month = month >= 10 ? month : '0' + month
  day = day >= 10 ? day : '0' + day
  hour = hour >= 10 ? hour : '0' + hour

  return new_date.getFullYear() + '-' + month + '-' + day + ' ' + hour + ':' + minute
}

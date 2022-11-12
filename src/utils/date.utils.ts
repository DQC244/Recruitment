import { addMinutes, format } from "date-fns";
import { AppConstant } from "const";

/**
 * Convert timestamp to date format
 *
 * @param {number} timeStamp - TimeStamp
 * @param {string} dateFormat - Date format
 * @param {string} timeFormat - Time format
 *
 * @param {string} dateFormat - Date format
 *
 * @param {string} timeFormat - Time format
 *
 * @return {object} Object of Date and Time
 *
 */

export const covertTimeStampToDateFormat = (
  timeStamp: number,
  isUTC = true,
  dateFormat = AppConstant.DATE_FORMAT,
  timeFormat = AppConstant.TIME_FORMAT,
) => {
  if (!timeStamp) return {};

  let date = "";
  let time = "";
  const convertedDate = new Date(timeStamp * 1000);

  if (isUTC) {
    date = format(addMinutes(convertedDate, convertedDate.getTimezoneOffset()), dateFormat);
    time = format(addMinutes(convertedDate, convertedDate.getTimezoneOffset()), timeFormat);
  } else {
    date = format(convertedDate, dateFormat);
    time = format(convertedDate, timeFormat);
  }

  return { date, time };
};

/**
 * format timestamp to  --:-- (UTC) - --/--/--
 *
 * @param {number} timeStamp - TimeStamp
 *
 * @return {string} string format
 *
 */
export const formatTimeStampToUTCString = (timeStamp: number): string => {
  if (timeStamp) {
    const { date, time } = covertTimeStampToDateFormat(
      timeStamp,
      true,
      AppConstant.FULL_DATE_FORMAT,
    );
    return ` ${time} (UTC) - ${date}`;
  } else {
    return "- - : - - (UTC) - -/- -/- - - -";
  }
};

import React from "react";
import { parseISO, formatDistanceToNow } from "date-fns";

type Props = { timestamp: string };

const isDuringToday = (date: Date): boolean => {
  const milisecondsInADay = 1000 * 60 * 60 * 24;

  const now = new Date();

  const differenceInMiliseconds: number = now.getTime() - date.getTime();

  const differenceInDays = Math.abs(
    differenceInMiliseconds / milisecondsInADay
  );

  return Math.floor(differenceInDays) === 0;
};

const getTimeAgo = (timestamp: string): string => {
  if (!timestamp) return "";

  const date: Date = parseISO(timestamp);

  if (isDuringToday(date)) {
    const timePeriod = formatDistanceToNow(date);

    return `${timePeriod} ago`;
  }

  return date.toLocaleDateString();
};

const TimeAgo: React.FC<Props> = ({ timestamp }) => {
  const timeAgo = getTimeAgo(timestamp);

  return (
    <span title={timestamp}>
      &nbsp; <i>{timeAgo}</i>
    </span>
  );
};

export default TimeAgo;

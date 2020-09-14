import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAllNotifications,
  allNotificationsRead
} from "./notificationsSlice";
import { selectAllUsers } from "../users/usersSlice";
import { parseISO, formatDistanceToNow } from "date-fns";
import classnames from "classnames";

const NotificationsList = () => {
  const dispatch = useDispatch();

  const notifications = useSelector(selectAllNotifications);

  const users = useSelector(selectAllUsers);

  useEffect(() => {
    dispatch(allNotificationsRead());
  });

  const renderedNotifications = notifications.map((notification) => {
    const date = parseISO(notification.date);
    const timeAgo = formatDistanceToNow(date);

    const user = users.find((user) => user.id === notification.user) || {
      name: "Unknown user"
    };

    const notificationClassname = classnames("notification", {
      new: notification.isNew
    });

    return (
      <div key={notification.id} className={notificationClassname}>
        <div>
          <b>{user.name}</b> {notification.message}
        </div>
        <div title={notification.date}>
          <i>{timeAgo} ago</i>
        </div>
      </div>
    );
  });

  return (
    <section className="notificationsList">
      <h2>Notifications</h2>
      {renderedNotifications}
    </section>
  );
};

export default NotificationsList;

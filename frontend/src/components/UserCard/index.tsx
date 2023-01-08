import { User } from "../../pages/RandomUsers";
import styles from "./styles.module.css";

interface UserCardProps {
  user: User;
}

export function UserCard(props: UserCardProps) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <img
          className={styles.userImage}
          src={props.user?.picture.medium}
          alt={`${props.user?.name.first} image`}
        />

        <h5 className={styles.userName}>
          {`${props.user?.name.first} ${props.user?.name.last}`}
        </h5>

        <span className={styles.userEmail}>{props.user?.email}</span>

        <div className={styles.usernameAndAgeContainer}>
          <span className={styles.usernameAndAge}>
            {props.user?.login.username}, {props.user?.registered.age} anos
          </span>
        </div>
      </div>
    </div>
  );
}

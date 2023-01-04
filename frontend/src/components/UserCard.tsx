import { User } from "../pages/RandomUsers";

interface UserCardProps {
  user: User;
}

export function UserCard(props: UserCardProps) {
  return (
    <div className="w-full mx-auto max-w-xs bg-white border py-2 pt-4 border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-col items-center pb-2">
        <img
          className="w-24 h-24 mb-3 rounded-full shadow-lg bg-fit"
          src={props.user?.picture.medium}
          alt={`${props.user?.name.first} image`}
        />
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          {`${props.user?.name.first} ${props.user?.name.last}`}
        </h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {props.user?.email}
        </span>
        <div className="flex mt-4 space-x-3">
          <span className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-black border-2 border-green-500 rounded-lg">
            {props.user?.login.username}, {props.user?.registered.age} anos
          </span>
        </div>
      </div>
    </div>
  );
}

import * as T from "@radix-ui/react-toast";
import { CheckIcon } from "./icons/Check";
import { ErrorIcon } from "./icons/Error";

interface ToastProps {
  open: boolean;
  onClose: () => void;
  content: string;
  status: string;
}

export function Toast(props: ToastProps) {
  return (
    <T.Provider>
      <T.Root
        open={props.open}
        className="flex mx-auto bg-white items-center w-full max-w-[400px] p-4 mb-4 text-gray-500 rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
      >
        <T.Title>
          {props.status === "success" ? <CheckIcon /> : <ErrorIcon />}
        </T.Title>
        <T.Description asChild>
          <div className="ml-3 text-sm font-normal">{props.content}</div>
        </T.Description>
        <T.Action
          className="ToastAction"
          asChild
          altText="Goto schedule to undo"
        >
          <button
            onClick={props.onClose}
            type="button"
            className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
            data-dismiss-target="#toast-success"
            aria-label="Close"
          >
            <span className="sr-only">Close</span>
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </T.Action>
      </T.Root>

      <T.Viewport className="w-screen h-fit px-2 fixed inset-0 top-7 list-none z-50" />
    </T.Provider>
  );
}

import * as T from "@radix-ui/react-toast";
import { CheckIcon } from "../icons/Check";
import { ErrorIcon } from "../icons/Error";
import styles from "./styles.module.css";

interface ToastProps {
  open: boolean;
  onClose: () => void;
  content: string;
  status: string;
}

export function Toast(props: ToastProps) {
  return (
    <T.Provider>
      <T.Root open={props.open} className={styles.container}>
        <T.Title>
          {props.status === "success" ? <CheckIcon /> : <ErrorIcon />}
        </T.Title>
        <T.Description asChild>
          <div className={styles.toastContent}>{props.content}</div>
        </T.Description>
        <T.Action
          className="ToastAction"
          asChild
          altText="Goto schedule to undo"
        >
          <button
            onClick={props.onClose}
            type="button"
            className={styles.closeToastBtn}
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
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </T.Action>
      </T.Root>

      <T.Viewport className={styles.toastViewport} />
    </T.Provider>
  );
}

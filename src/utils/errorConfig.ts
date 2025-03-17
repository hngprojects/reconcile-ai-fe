import { ErrorModalConfig } from "@/src/types/error-modal";

export const getErrorConfig = (
  errorCode?: number,
  defaultMessage?: string,
): ErrorModalConfig => {
  switch (errorCode) {
    case 429:
      return {
        title: "Authentication Required",
        message: "Please sign in to continue using the service.",
        imageSrc: "/rate-limit.svg",
        buttonTitle: "Sign in with Google",
        buttonHref: "#",
        buttonAction: "googleSignIn",
      };
    case 401:
      return {
        title: "Session Expired",
        message: "Your session has expired. Please sign in again.",
        imageSrc: "/assets/images/Sad.svg",
        buttonTitle: "Sign in",
        buttonHref: "#",
        buttonAction: "googleSignIn",
      };
    case 408:
      return {
        title: "Processing Timeout",
        message: "File processing took too long. Please try again later.",
        imageSrc: "/assets/images/Sad.svg",
        buttonTitle: "Try Again",
        buttonHref: "/file-upload",
        buttonAction: "navigate",
      };
    case 500:
      return {
        title: "Server Error",
        message: "Something went wrong on our end. Please try again later.",
        imageSrc: "/assets/images/Sad.svg",
        buttonTitle: "Try Again",
        buttonHref: "/file-upload",
        buttonAction: "navigate",
      };
    case 422:
      return {
        title: "Invalid File Structure",
        message: "file format not currently supported",
        imageSrc: "/assets/images/Sad.svg",
        buttonTitle: "Upload Correct Files",
        buttonHref: "/file-upload",
        buttonAction: "navigate",
      };
    case 403:
      return {
        title: "Row Limit Exceeded",
        message:
          "Free users can only reconcile files with up to 100 rows. Please sign in to process larger files.",
        imageSrc: "/assets/images/Sad.svg",
        buttonTitle: "Sign in",
        buttonHref: "#",
        buttonAction: "googleSignIn",
      };
    default:
      return {
        title: "Invalid File Structure",
        message:
          defaultMessage ||
          "Please ensure your files follow the required format",
        imageSrc: "/assets/images/Sad.svg",
        buttonTitle: "Try Again",
        buttonHref: "/file-upload",
        buttonAction: "navigate",
      };
  }
};

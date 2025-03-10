import { ErrorModalConfig } from "@/src/types/error-modal";

export const getErrorConfig = (
  errorCode?: number,
  defaultMessage?: string
): ErrorModalConfig => {
  switch (errorCode) {
    case 429:
      return {
        title: "Rate Limit Reached",
        message:
          "Maximum number of requests reached. Please login to continue.",
        imageSrc: "/rate-limit.png",
        buttonTitle: "Sign in with Google",
        buttonHref: "#",
        buttonAction: "googleSignIn",
      };
    case 408:
      return {
        title: "Processing Timeout",
        message: "File processing took too long. Please try again later.",
        imageSrc: "/assets/images/Sad.png",
        buttonTitle: "Try Again",
        buttonHref: "/file-upload",
        buttonAction: "navigate",
      };
    case 500:
      return {
        title: "Server Error",
        message: "Something went wrong on our end. Please try again later.",
        imageSrc: "/assets/images/Sad.png",
        buttonTitle: "Try Again",
        buttonHref: "/file-upload",
        buttonAction: "navigate",
      };
    case 422: 
      return {
        title: "Invalid File Structure",
        message:
          "CSV Table Structure not currently supported",
        imageSrc: "/assets/images/Sad.png",
        buttonTitle: "Upload Correct Files",
        buttonHref: "/file-upload",
        buttonAction: "navigate",
      };
    default:
      return {
        title: "Invalid File Structure",
        message:
          defaultMessage ||
          "Please ensure your files follow the required format",
        imageSrc: "/assets/images/Sad.png",
        buttonTitle: "Try Again",
        buttonHref: "/file-upload",
        buttonAction: "navigate",
      };
  }
};

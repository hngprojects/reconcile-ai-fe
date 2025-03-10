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
        buttonHref: "#", // Changed to # since we'll use onClick handler
        buttonAction: "googleSignIn", // Add this to identify action type
      };
    case 408:
      return {
        title: "Processing Timeout",
        message: "File processing took too long. Please try again later.",
        imageSrc: "/assets/images/Sad.png",
        buttonTitle: "Try Again",
        buttonHref: "/file-upload",
      };
    case 500:
      return {
        title: "Server Error",
        message: "Something went wrong on our end. Please try again later.",
        imageSrc: "/assets/images/Sad.png",
        buttonTitle: "Go Back",
        buttonHref: "/file-upload",
      };
    default:
      return {
        title: "Oops!",
        message: defaultMessage || "Something went wrong",
        imageSrc: "/assets/images/Sad.png",
        buttonTitle: "Go to Upload",
        buttonHref: "/file-upload",
      };
  }
};

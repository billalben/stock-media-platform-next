export interface FriendlyError {
  title: string;
  message: string;
}

export function getFriendlyError(status?: number): FriendlyError {
  if (status === 429) {
    return {
      title: "Too many requests",
      message:
        "The stock library is receiving too many requests right now. Please wait a moment and try again.",
    };
  }

  if (status === 404) {
    return {
      title: "Not found",
      message: "We couldn't find that content. It may have been removed.",
    };
  }

  if (status && status >= 500) {
    return {
      title: "Temporarily unavailable",
      message:
        "The stock library is having trouble right now. Please try again shortly.",
    };
  }

  return {
    title: "Something went wrong",
    message: "We couldn't load this content. Please try again.",
  };
}

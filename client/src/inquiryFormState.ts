export type InquiryFormState = "idle" | "submitting" | "success";

export function getInquiryFormState(isPending: boolean, sent: boolean): InquiryFormState {
  if (sent) return "success";
  if (isPending) return "submitting";
  return "idle";
}

export function shouldBlockInquirySubmit(state: InquiryFormState): boolean {
  return state === "submitting" || state === "success";
}

export function getInquirySubmitA11y(state: InquiryFormState) {
  return {
    disabled: shouldBlockInquirySubmit(state),
    busy: state === "submitting",
    liveMessage:
      state === "submitting"
        ? "Sending your inquiry"
        : state === "success"
          ? "Your inquiry was sent successfully"
          : undefined,
  };
}

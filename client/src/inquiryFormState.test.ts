import { describe, expect, it } from "vitest";
import { getInquiryFormState, getInquirySubmitA11y, shouldBlockInquirySubmit } from "./inquiryFormState";

describe("inquiry form interaction states", () => {
  it("starts idle and allows submission", () => {
    expect(getInquiryFormState(false, false)).toBe("idle");
    expect(shouldBlockInquirySubmit("idle")).toBe(false);
    expect(getInquirySubmitA11y("idle")).toEqual({ disabled: false, busy: false, liveMessage: undefined });
  });

  it("blocks duplicate submissions and exposes a busy state while sending", () => {
    expect(getInquiryFormState(true, false)).toBe("submitting");
    expect(shouldBlockInquirySubmit("submitting")).toBe(true);
    expect(getInquirySubmitA11y("submitting")).toEqual({
      disabled: true,
      busy: true,
      liveMessage: "Sending your inquiry",
    });
  });

  it("shows a non-busy success state after delivery", () => {
    expect(getInquiryFormState(false, true)).toBe("success");
    expect(shouldBlockInquirySubmit("success")).toBe(true);
    expect(getInquirySubmitA11y("success")).toEqual({
      disabled: true,
      busy: false,
      liveMessage: "Your inquiry was sent successfully",
    });
  });
});

import {
  CONTACT_US_API_URL,
  NEWSLETTER_API_URL,
  RECONCILE_API_URL,
  WAITLIST_API_URL,
  MANUAL_API_URL,
  MARKETING_DEMO_API_URL,
  PARTNER_API_URL,
  CUSTOMER_FEEDBACK_API_URL,
  RECONCILIATION_RESULT_API_URL
} from "./apiEndpoints";

import { ManualRequestBody } from "@/src/types/reconciliation";

// interface ApiError extends Error {
//   code?: number;
//   status?: number;
// }

interface MarketingDemoData {
  full_name: string;
  business_name: string;
  email: string;
  phone_number: string;
}

export interface PartnerFormData {
  full_name: string;
  business_name: string;
  service_interested: string;
  email: string;
  phone_number: string;
}

export interface PartnerResponse {
  success: boolean;
  message?: string;
  errors?: {
    full_name?: string[];
    business_name?: string[];
    service_interested?: string[];
    email?: string[];
    phone_number?: string[];
  };
}

export async function reconcileFiles(bankFiles: File[], ledgerFiles: File[]) {
  const formData = new FormData();
  bankFiles.forEach((file) => formData.append("bank_statements[]", file));
  ledgerFiles.forEach((file) => formData.append("ledgers[]", file));

  const token = localStorage.getItem("access_token");
  const headers: HeadersInit = {
    Accept: "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(RECONCILE_API_URL, {
      method: "POST",
      headers,
      body: formData,
    });

    const data = await response.json();

    if (response.status === 429) {
      return {
        status: "error",
        code: 429,
        message:
          "Maximum number of requests reached. Please login to continue.",
      };
    }

    if (response.status === 408) {
      return {
        status: "error",
        code: 408,
        message: "File processing took too long. Please try again later.",
      };
    }

    if (!response.ok) {
      return {
        status: "error",
        code: response.status,
        message: data.message || "Reconciliation failed",
      };
    }

    return {
      status: "success",
      data: data,
    };
  } catch (error) {
    console.error("Reconciliation error:", error);
    return {
      status: "error",
      code: 500,
      message: "An unexpected error occurred",
    };
  }
}

// Waitlist API
export async function handleAddToWaitlist(email: string): Promise<{
  success?: string;
  error?: string;
}> {
  try {
    const response = await fetch(WAITLIST_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { error: data.message || "Failed to add to waitlist" };
    }

    return { success: data.message };
  } catch (error) {
    console.error(`Waitlist error for email ${email}:`, error);
    return { error: "Something went wrong. Please try again later." };
  }
}

// CONTACT US
export async function handleContactUs(userInfo: {
  name: string;
  email: string;
  message: string;
  phone_number: string;
}) {
  try {
    const response = await fetch(CONTACT_US_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to send contact us message");
    }

    return { success: data.message };
  } catch (error) {
    console.error("Contact us error:", error);
    return { error: "Something went wrong. Please try again later." };
  }
}

// Newsletter API
export async function handleAddToNewsLetter(email: string): Promise<{
  success?: string;
  error?: string;
}> {
  try {
    const response = await fetch(NEWSLETTER_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { error: data.message || "Failed to add to newsletter" };
    }

    return { success: data.message };
  } catch {
    // console.error(`Newsletter error for email ${email}:`, error);
    return { error: "Something went wrong. Please try again later." };
  }
}

export async function updateReconciliation(
  reconciliation: string,
  data: ManualRequestBody,
) {
  try {
    const response = await fetch(`${MANUAL_API_URL}${reconciliation}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });

    const resData = await response.json();

    if (!response.ok) {
      return { error: resData.message || "Failed to add to newsletter" }; //TODO: Correct this
    }

    return resData;
  } catch {
    return { error: "Something went wrong. Please try again later." };
  }
}

export async function handleMarketingDemo(data: MarketingDemoData) {
  try {
    const response = await fetch(MARKETING_DEMO_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || "Failed to submit demo request");
    }

    return { success: true, data: responseData.data };
  } catch (error) {
    console.error("Marketing demo error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Something went wrong",
    };
  }
}

export const handlePartnerSubmission = async (
  data: PartnerFormData,
): Promise<PartnerResponse> => {
  try {
    const response = await fetch(PARTNER_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      if (response.status === 422) {
        return {
          success: false,
          errors: result.errors,
        };
      }
      throw new Error(result.message || "Failed to submit partnership request");
    }

    return result;
  } catch (error) {
    console.error("Partner submission error:", error);
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to submit partnership request. Please try again.",
    };
  }
};
//CUSTOMER_FEEDBACK_API_URL
export const handleCustomerFeedback = async (formData: FormData) => {
  try {
    const response = await fetch(CUSTOMER_FEEDBACK_API_URL, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong");
    }

    return {
      success: true,
      data: data.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "An error occurred",
    };
  }
};

export const fetchReconciliation = async(reconciliationId: string) => {
  try {
    const response = await fetch(`${RECONCILIATION_RESULT_API_URL}${reconciliationId}`);

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong");
    }

    return {
      success: true,
      data: data.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "An error occurred",
    };
  }
};

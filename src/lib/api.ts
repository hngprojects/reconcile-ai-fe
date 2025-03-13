import {
  CONTACT_US_API_URL,
  NEWSLETTER_API_URL,
  RECONCILE_API_URL,
  WAITLIST_API_URL,
} from "./apiEndpoints";

interface ApiError extends Error {
  code?: number;
  status?: number;
}

export async function reconcileFiles(
  file1: File,
  file2: File,
  keyColumn: string
) {
  const formData = new FormData();
  formData.append("file1", file1);
  formData.append("file2", file2);
  formData.append("key_column", keyColumn);

  const token = localStorage.getItem("access_token");
  const headers: HeadersInit = {};

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  console.log("Sending files for reconciliation:", {
    file1: file1.name,
    file2: file2.name,
    keyColumn,
  });

  try {
    const response = await fetch(RECONCILE_API_URL, {
      method: "POST",
      headers,
      body: formData,
    });

    const data = await response.json();
    console.log("Raw API Response:", data);

    // Handle specific status codes
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
  } catch (error: unknown) {
    console.error("Reconciliation error:", error);
    const err = error as ApiError;
    return {
      status: "error",
      code: err.status || 500,
      message: err.message || "An unexpected error occurred",
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

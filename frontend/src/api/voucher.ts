export interface Voucher {
  title: string;
  subtitle: string;
  description: string;
  points: number;
  slots: number;
  acceptedBy: [];
  userStatuses: []; // Track status per user
  createdAt: Date;
  updatedAt: Date;
}

import axios from "axios";

const USER_SERVICE_URL = "http://localhost:4000";
const VOUCHERS_BASE = "/vouchers";
const CREATE_API = "/create";
const ACCEPT_VOUCHER_API = "/acceptVoucher";
const COMPLETE_VOUCHER_API = "/complete";
const DELETE_API = "/delete";
const APPROVE_REJECT_VOUCHER_API = "/approveRejectVoucher";

const api = axios.create({
  baseURL: USER_SERVICE_URL,
  withCredentials: true,
});

/**
 * An async function for getting all voucher data
 * @returns An object containing the HTTP status code of the request, the responded message from the backend and the voucher's information.
 */
async function getAvailableVouchers() {
  return await api
    .get(VOUCHERS_BASE)
    .then((response) => {
      console.log(response);
      const voucherInfo = response.data;
      return {
        status: response.status,
        message: response.data.message,
        voucherInfo: voucherInfo,
      };
    })
    .catch((error) => {
      return {
        status: error.status,
        message: error.response.data.message,
        voucherInfo: null,
      };
    });
}

/**
 * An async function for sending a create voucher request to the backend.
 * @param title
 * @param subtitle
 * @param description
 * @param points
 * @param slots
 * @returns An object containing the HTTP status code of the request and the responded message from the backend.
 */
async function createVoucher(
  title: string,
  subtitle: string,
  description: string,
  points: number,
  slots: number
) {
  const requestBody = {
    title: title,
    subtitle: subtitle,
    description: description,
    points: points,
    slots: slots,
  };
  return await api
    .post(VOUCHERS_BASE + CREATE_API, requestBody)
    .then((response) => {
      return { status: response.status, message: response.data.message };
    })
    .catch((error) => {
      return { status: error.status, message: error.response.data.message };
    });
}

/**
 * An async function for sending a accept voucher request to the backend.
 * @param voucherId
 * @param userId
 * @returns An object containing the HTTP status code of the request and the responded message from the backend.
 */
async function acceptVoucher(voucherId: string, userId: string) {
  const voucherAcceptData = {
    voucherId: voucherId,
    userId: userId,
  };

  try {
    const response = await api.patch(
      VOUCHERS_BASE + ACCEPT_VOUCHER_API,
      voucherAcceptData
    );
    return { status: response.status, message: response.data.message };
  } catch (error: any) {
    return {
      status: error.response.status,
      message: error.response.data.message,
    };
  }
}

/**
 * An async function for user to send a complete voucher request to the backend.
 * @param voucherId
 * @param userId
 * @returns An object containing the HTTP status code of the request and the responded message from the backend.
 */
async function completeVoucher(voucherId: string, userId: string) {
  const voucherCompleteData = {
    voucherId: voucherId,
    userId: userId,
  };

  try {
    const response = await api.patch(
      VOUCHERS_BASE + COMPLETE_VOUCHER_API,
      voucherCompleteData
    );
    return { status: response.status, message: response.data.message };
  } catch (error: any) {
    return {
      status: error.response.status,
      message: error.response.data.message,
    };
  }
}

/**
 * An async function that updates a user's details.
 */
// async function updateAccount(details: {
//   id: string;
//   username?: string;
//   email?: string;
//   phoneNumber?: string;
//   gender?: string;
//   isActive?: boolean;
//   newPassword?: string;
// }) {
//   const updateAccountData = details;
//   try {
//     const response = await api.patch(
//       USERS_BASE_URL + UPDATE_ACCOUNT_API,
//       updateAccountData
//     );
//     console.log("Successfully updated account!");
//     return { status: response.status, message: response.data.message };
//   } catch (error: any) {
//     console.error("Error when updating account", error);
//     return {
//       status: error.response.status,
//       message: error.response.data.message,
//     };
//   }
// }

/**
 * An async function that deletes a user given the user ID.
 */
async function deleteVoucher(id: string) {
  try {
    const response = await api.delete(VOUCHERS_BASE + DELETE_API + "/" + id);
    return { status: response.status, message: response.data.message };
  } catch (error: any) {
    console.error(`Error when deleting voucher ID ${id}\n`, error);
    return {
      status: error.response.status,
      message: error.response.data.message,
    };
  }
}

/**
 * An async function to update a specific user's privilege given the user ID.
 */
async function approveRejectVoucher(
  voucherId: string,
  userId: string,
  action: string
) {
  const voucherActionData = {
    voucherId: voucherId,
    userId: userId,
    action: action,
  };

  try {
    const response = await api.patch(
      VOUCHERS_BASE + APPROVE_REJECT_VOUCHER_API,
      voucherActionData
    );
    return { status: response.status, message: response.data.message };
  } catch (error: any) {
    console.error(`Error when approving voucher ID ${voucherId}\n`, error);
    return {
      status: error.response.status,
      message: error.response.data.message,
    };
  }
}

export {
  getAvailableVouchers,
  createVoucher,
  acceptVoucher,
  completeVoucher,
  deleteVoucher,
  approveRejectVoucher,
};

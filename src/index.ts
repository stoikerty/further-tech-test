import refundRequests from './refund-requests.json';
import adaptToInternalRefundRequest from './utils/adaptToInternalRefundRequest';
import type { RefundRequest } from './types';

(refundRequests as RefundRequest[]).forEach((request) => {
  const internalRefundRequest = adaptToInternalRefundRequest(request);

  console.log('internalRefundRequest: ', internalRefundRequest);
});

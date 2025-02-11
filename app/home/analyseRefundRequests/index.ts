import refundRequests from './refund-requests.json';
import adaptToInternalRefundRequest from './utils/adaptToInternalRefundRequest';
import type { RefundRequest } from './types';

export default (refundRequests as RefundRequest[]).map((request) => {
  const internalRefundRequest = adaptToInternalRefundRequest(request);
  const { name, investment, registeredRefundRequestTime, approvalTimeLimitHours } =
    internalRefundRequest;

  const hoursDifference = registeredRefundRequestTime.diff(investment, 'hours').hours;
  const approved = hoursDifference <= approvalTimeLimitHours;

  console.log(`${name}: ${approved ? 'Approved' : 'Denied'}`);
  console.log(`(Time diff: ${hoursDifference}h vs allowed ${approvalTimeLimitHours}h)`);
  console.log(internalRefundRequest, '\n');
  return {
    name,
    internalRefundRequest,
    approved,
    hoursDifference,
  };
});

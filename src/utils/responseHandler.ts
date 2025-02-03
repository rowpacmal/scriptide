/* eslint-disable @typescript-eslint/no-explicit-any */

// Interface
interface IResponse {
  status: boolean;
  pending: boolean;
  response: any;
  error: string;
}

// Response Object
class Response {
  status: boolean;
  pending: boolean;
  response: any;
  error: string;

  constructor({ status, pending, response, error }: IResponse) {
    this.status = status;
    this.pending = pending;
    this.response = response;
    this.error = error;
  }
}

// Response handler utility function
function responseHandler(
  msg: any,
  resolve: any,
  reject: any,
  genericError: string
) {
  // If the response is an array
  if (msg.length > 0) {
    let success = true;
    let error = '';

    msg.forEach((r: any) => {
      if (!r.status) {
        success = false;
        error = r.error;
        return;
      }
    });

    if (success) {
      // On success
      resolve(
        new Response({
          status: true,
          pending: false,
          response: msg[msg.length - 1].response,
          error: '',
        })
      );
    } else {
      // On error
      reject(
        new Response({ status: false, pending: false, response: null, error })
      );
    }
  }

  // On success
  if (msg.status && !msg.pending) {
    resolve(
      new Response({
        status: true,
        pending: false,
        response: msg.response,
        error: '',
      })
    );
  }

  // On pending
  if (!msg.status && msg.pending) {
    reject(
      new Response({
        status: false,
        pending: true,
        response: msg.response,
        error: 'pending',
      })
    );
  }

  // On error
  if (!msg.status && !msg.pending) {
    reject(
      new Response({
        status: false,
        pending: false,
        response: null,
        error: msg.message ? msg.message : msg.error ? msg.error : genericError,
      })
    );
  }
}

// Export
export default responseHandler;

// Import types
import { IResponse, TMessage, TReject, TResolve } from '@/types';

// Response Object
class Response<T> {
  status: boolean;
  pending: boolean;
  response: T | null;
  error: string;

  constructor({ status, pending, response, error }: IResponse<T>) {
    this.status = status;
    this.pending = pending;
    this.response = response;
    this.error = error;
  }
}

// Response handler utility function
function responseHandler<T>(
  msg: TMessage<T> | TMessage<T>[],
  resolve: TResolve<T>,
  reject: TReject<T>,
  genericError: string
) {
  if (Array.isArray(msg)) {
    // If the response is an array
    if (msg.length > 0) {
      let success = true;
      let error = '';

      msg.forEach((r) => {
        if (!r.status) {
          success = false;
          error = r.error;
          return;
        }
      });

      if (success) {
        // On success
        resolve(
          new Response<T>({
            status: true,
            pending: false,
            response: msg[msg.length - 1].response,
            error: '',
          })
        );
      } else {
        // On error
        reject(
          new Response<T>({
            status: false,
            pending: false,
            response: null,
            error,
          })
        );
      }
    }
  } else {
    // On success
    if (msg.status && !msg.pending) {
      resolve(
        new Response<T>({
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
        new Response<T>({
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
        new Response<T>({
          status: false,
          pending: false,
          response: null,
          error: msg.message
            ? msg.message
            : msg.error
            ? msg.error
            : genericError,
        })
      );
    }
  }
}

// Export
export default responseHandler;

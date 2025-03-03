type TMessage = {
  status: boolean;
  pending: boolean;
  response: unknown;
  error: string;
  message?: string;
};
type TResolve = (value: IResponse) => void;
type TReject = (reason: IResponse) => void;

interface IResponse {
  status: boolean;
  pending: boolean;
  response: unknown;
  error: string;
}

export type { TMessage, TResolve, TReject, IResponse };

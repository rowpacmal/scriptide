// Interface
interface IResponse {
  status: boolean;
  pending: boolean;
  response: unknown;
  error: string;
}

// Types
type TMessage = {
  status: boolean;
  pending: boolean;
  response: unknown;
  error: string;
  message?: string;
};
type TResolve = (value: IResponse) => void;
type TReject = (reason: IResponse) => void;

export type { IResponse, TMessage, TResolve, TReject };

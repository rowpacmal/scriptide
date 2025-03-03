// Import types
import { TScriptVariables } from './stores';

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
  event?: string;
};
type TResolve = (value: IResponse) => void;
type TReject = (reason: IResponse) => void;
type TRunScriptMessage = TMessage & {
  response: {
    clean: { address: string; mxaddress: string; script: string };
    monotonic: boolean;
    parseok: boolean;
    success: boolean;
    trace: string;
    variables: TScriptVariables;
  };
};

export type { IResponse, TMessage, TResolve, TReject, TRunScriptMessage };

import { TScriptVariables } from './stores';

type TMDSFileLoad = {
  load: {
    data: string;
  };
};
type TMDSCommandMMRCreate = {
  nodes: { proof: string }[];
  root: {
    data: string;
  };
};
type TMDSCommandRunScript = {
  clean: { address: string; mxaddress: string; script: string };
  monotonic: boolean;
  parseok: boolean;
  success: boolean;
  trace: string;
  variables: TScriptVariables;
};

export type { TMDSFileLoad, TMDSCommandMMRCreate, TMDSCommandRunScript };

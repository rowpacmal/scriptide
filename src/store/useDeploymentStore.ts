import minima from '@/lib/minima';
import { create } from 'zustand';

// Types for the store
type TScript = {
  address: string;
  default: boolean;
  miniaddress: string;
  publickey: string;
  script: string;
  simple: boolean;
  track: boolean;
};

// Interface for the store
interface IDeploymentStore {
  deployedScripts: string[];
  setDeployedScripts: (scripts: string[]) => void;

  getAllScripts: () => Promise<void>;
  getScript: (address: string) => Promise<void>;
  deployScript: (
    script: string,
    trackall: boolean,
    clean: boolean
  ) => Promise<void>;
  removeScript: (address: string) => Promise<void>;
}

// Create the store
const useDeploymentStore = create<IDeploymentStore>((set, get) => ({
  deployedScripts: [],
  setDeployedScripts: (scripts: string[]) => set({ deployedScripts: scripts }),

  getAllScripts: async () => {
    const deployedScripts = (await minima.cmd('scripts')).response
      .filter((script: TScript) => {
        if (!script.default) {
          if (
            script.address !==
            '0x56FCB91ECCF1E0B31B5ADF7D3374411F4BA1C569685CC945634FB2A23D4554E9'
          ) {
            return true;
          }
        }
      })
      .reverse();

    // console.log(deployedScripts);

    set({ deployedScripts });
  },
  getScript: async () => {},
  deployScript: async (script: string, trackall: boolean, clean: boolean) => {
    await minima.cmd(
      `newscript trackall:${trackall} clean:${clean} script:"${script}"`
    );

    get().getAllScripts();
  },
  removeScript: async (address: string) => {
    await minima.cmd(`removescript address:${address}`);

    get().getAllScripts();
  },
}));

// Export the store
export default useDeploymentStore;

// Import dependencies
import { create } from 'zustand';
// Import libraries
import minima from '@/lib/minima';
// Import types
import { IDeploymentStore, TScript } from '@/types';

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

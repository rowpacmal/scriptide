import minima from '@/lib/minima';
import { TFile } from '@/types';

async function listAllFiles(
  workspace: string,
  path: string = `workspaces/${workspace}`
): Promise<TFile[]> {
  const response = (await minima.file.list(path)).response.list;
  let allFiles = response; // Start with the files in the current path

  for (const file of response) {
    if (file.isdir) {
      const subdirectoryFiles = await listAllFiles(
        workspace,
        `${path}/${file.name}`
      );
      allFiles = allFiles.concat(subdirectoryFiles);
    }
  }

  return allFiles;
}

export default listAllFiles;

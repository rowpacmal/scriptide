// Import libraries
import minima from '../libs/minima';

// Get files utility function
async function getFiles(path: string) {
  const files: any = (await minima.file.list(path)).response.list;

  const temp: string[] = [];

  if (files.length > 0) {
    for (const { name } of files) {
      temp.push(name);
    }
  }

  return temp;
}

// Export
export default getFiles;

import { Tree } from '@nx/devkit';
import { libraryGenerator } from '@nx/angular/generators';
import { GenerateAngularLibraryGeneratorSchema } from './schema';

const TYPES = ['ui', 'data-access', 'feature', 'util'];

export async function generateAngularLibraryGenerator(
  tree: Tree,
  options: GenerateAngularLibraryGeneratorSchema
) {
  if (options.type === 'all') {
    for (const type of TYPES) {
      await generateLibrary(tree, options, type);
    }
  } else {
    await generateLibrary(tree, options, options.type);
  }

  const path = `libs/${options.domain}/${options.type}/${options.name}/src`;

  tree.delete(`${path}/lib/${options.name}`);
  tree.write(`${path}/index.ts`, '');
}
export default generateAngularLibraryGenerator;

async function generateLibrary(
  tree: Tree,
  options: GenerateAngularLibraryGeneratorSchema,
  type: string
) {
  await libraryGenerator(tree, {
    name: options.name,
    simpleName: true,
    standalone: true,
    buildable: true,
    prefix: `bt-libs-${type}`,
    style: 'scss',
    changeDetection: 'OnPush',
    directory: `libs/${options.domain}/${type}`,
    tags: `domain:${options.domain}, type:${type}`,
    importPath: `@bt-libs/${options.domain}/${type}/${options.name}`,
  });
}

import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree, readProjectConfiguration } from '@nx/devkit';

import { generateAngularLibraryGenerator } from './generator';
import { GenerateAngularLibraryGeneratorSchema } from './schema';

describe('generate-angular-library generator', () => {
  let tree: Tree;
  const options: GenerateAngularLibraryGeneratorSchema = { name: 'test' };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    await generateAngularLibraryGenerator(tree, options);
    const config = readProjectConfiguration(tree, 'test');
    expect(config).toBeDefined();
  });
});

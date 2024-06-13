import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree, readProjectConfiguration } from '@nx/devkit';

import { generateAngularApplicationGenerator } from './generator';
import { GenerateAngularApplicationGeneratorSchema } from './schema';

describe('generate-angular-application generator', () => {
  let tree: Tree;
  const options: GenerateAngularApplicationGeneratorSchema = { name: 'test' };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    await generateAngularApplicationGenerator(tree, options);
    const config = readProjectConfiguration(tree, 'test');
    expect(config).toBeDefined();
  });
});

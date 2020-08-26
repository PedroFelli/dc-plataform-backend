import FakeToolRepository from '../repositories/fakes/FakeToolRepository';
import CreateToolService from './CreateToolService';
import AppError from '../../../errors/AppError';

describe('Create ToolService', () => {
  it('should be able to create a new tool', async () => {
    const fakeToolRepository = new FakeToolRepository();
    const createTool = new CreateToolService(fakeToolRepository);

    const tool = await createTool.execute({
      title: 'hotel',
      link: 'https://github.com/typicode/hotel',
      description:
        'Local app manager. Start apps within your browser, developer tool with local .localhost domain and https out of the box.',
      tags: [
        'node',
        'organizing',
        'webapps',
        'domain',
        'developer',
        'https',
        'proxy',
      ],
    });

    expect(tool).toHaveProperty('_id');
    expect(tool.title).toEqual(tool.title);
  });

  it('should not be able to create a new tool with same title', async () => {
    const fakeToolRepository = new FakeToolRepository();
    const createTool = new CreateToolService(fakeToolRepository);

    await createTool.execute({
      title: 'hotel',
      link: 'https://github.com/typicode/hotel',
      description:
        'Local app manager. Start apps within your browser, developer tool with local .localhost domain and https out of the box.',
      tags: [
        'node',
        'organizing',
        'webapps',
        'domain',
        'developer',
        'https',
        'proxy',
      ],
    });

    await createTool.execute({
      title: 'hotel 2',
      link: 'https://github.com/typicode/hotel',
      description:
        'Local app manager. Start apps within your browser, developer tool with local .localhost domain and https out of the box.',
      tags: [
        'node',
        'organizing',
        'webapps',
        'domain',
        'developer',
        'https',
        'proxy',
      ],
    });

    await expect(
      createTool.execute({
        title: 'hotel',
        link: 'https://github.com/typicode/hotel',
        description:
          'Local app manager. Start apps within your browser, developer tool with local .localhost domain and https out of the box.',
        tags: [
          'node',
          'organizing',
          'webapps',
          'domain',
          'developer',
          'https',
          'proxy',
        ],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

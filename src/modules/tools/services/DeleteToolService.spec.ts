import FakeToolRepository from '../repositories/fakes/FakeToolRepository';
import CreateToolService from './CreateToolService';
import DeleteToolService from './DeleteToolService';
import AppError from '../../../errors/AppError';

describe('DeleteToolService', () => {
  it('should be able to delete a tool with id', async () => {
    const fakeToolRepository = new FakeToolRepository();
    const createTool = new CreateToolService(fakeToolRepository);
    const deleteTool = new DeleteToolService(fakeToolRepository);

    const tool1 = await createTool.execute({
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

    const tool2 = await createTool.execute({
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

    const { id } = tool2;

    await deleteTool.execute(id as string);

    const tools = await fakeToolRepository.getAll();

    expect(tools).toEqual(expect.arrayContaining([tool1]));
  });

  it('should not able to delete a tool with fake id', async () => {
    const fakeToolRepository = new FakeToolRepository();
    const createTool = new CreateToolService(fakeToolRepository);
    const deleteTool = new DeleteToolService(fakeToolRepository);

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

    await expect(deleteTool.execute('fakeIdTool')).rejects.toBeInstanceOf(
      AppError,
    );
  });
});

import FakeToolRepository from '../repositories/fakes/FakeToolRepository';
import CreateToolService from './CreateToolService';
import FindToolService from './FindAllToolService';

describe('ListToolService', () => {
  it('should be able to list all tools', async () => {
    const fakeToolRepository = new FakeToolRepository();
    const createTool = new CreateToolService(fakeToolRepository);
    const findTool = new FindToolService(fakeToolRepository);

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

    const tools = await findTool.execute();
    expect(tools).toEqual(expect.arrayContaining([tool1, tool2]));
  });
});

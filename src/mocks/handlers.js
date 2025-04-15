import { rest } from 'msw';

export const handlers = [
  rest.get('/api/needs', (req, res, ctx) => {
    return res(
      ctx.json([
        {
          id: '1',
          title: '新型手术导航系统',
          description: '需要开发更精确的术中导航系统',
          category: 'surgery',
          submitter: '1',
          organization: '某三甲医院',
          createdAt: new Date().toISOString(),
          priority: 'high',
          status: 'published',
          votes: 10,
        },
      ])
    );
  }),
  rest.get('/api/innovations', (req, res, ctx) => {
    return res(ctx.json([]));
  }),
  rest.get('/api/voting', (req, res, ctx) => {
    return res(
      ctx.json([
        {
          id: '1',
          title: '手术导航系统评选',
          description: '为新型手术导航系统需求投票',
          votes: 10,
          votedUsers: [],
        },
      ])
    );
  }),
  rest.get('/api/yearbooks', (req, res, ctx) => {
    return res(
      ctx.json([
        {
          id: '1',
          title: '2024医疗创新年鉴',
          description: '年度医疗需求与创新总结',
          pdfUrl: '#',
        },
      ])
    );
  }),
  rest.get('/api/events', (req, res, ctx) => {
    return res(
      ctx.json([
        {
          id: '1',
          title: '医疗创新峰会',
          description: '探讨最新医疗技术',
          date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          location: '上海',
          registerUrl: '#',
        },
      ])
    );
  }),
];
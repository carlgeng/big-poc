const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(express.json());

const SECRET_KEY = 'your-secret-key';
const PORT = process.env.PORT || 8080;

// Mock database
let users = [
  {
    id: '1',
    email: 'admin@example.com',
    password: bcrypt.hashSync('admin123', 10),
    name: '管理员',
    organization: '平台管理',
    role: 'admin',
  },
];
let needs = [
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
    impact: '提高手术成功率',
    currentSolution: '现有系统精度不足',
    desiredOutcome: '厘米级定位精度',
    targetPopulation: '外科患者',
    resources: '医院数据支持',
  },
];
let innovations = [];
let votingItems = [
  {
    id: '1',
    title: '手术导航系统评选',
    description: '为新型手术导航系统需求投票',
    votes: 10,
    votedUsers: [],
  },
];
let yearbooks = [
  {
    id: '1',
    title: '2024医疗创新年鉴',
    description: '年度医疗需求与创新总结',
    pdfUrl: '#',
  },
];
let events = [
  {
    id: '1',
    title: '医疗创新峰会',
    description: '探讨最新医疗技术',
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    location: '上海',
    registerUrl: '#',
  },
];
let activities = [];
let blockchainRecords = [];

// Middleware to verify JWT
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: '未授权' });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: '无效的令牌' });
  }
};

// Auth routes
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: '邮箱或密码错误' });
  }

  const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, { expiresIn: '1d' });
  res.json({ token, user: { id: user.id, email: user.email, name: user.name, organization: user.organization, role: user.role } });
});

app.post('/api/register', async (req, res) => {
  const { email, password, name, organization } = req.body;
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ message: '邮箱已存在' });
  }

  const id = uuidv4();
  const hashedPassword = bcrypt.hashSync(password, 10);
  const user = { id, email, password: hashedPassword, name, organization, role: 'user' };
  users.push(user);

  const token = jwt.sign({ id, role: user.role }, SECRET_KEY, { expiresIn: '1d' });
  res.json({ token, user: { id, email, name, organization, role: user.role } });
});

app.get('/api/profile', authMiddleware, (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  res.json({ id: user.id, email: user.email, name: user.name, organization: user.organization, role: user.role });
});

app.put('/api/profile', authMiddleware, (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  user.name = req.body.name || user.name;
  user.organization = req.body.organization || user.organization;
  res.json({ message: '更新成功' });
});

// Needs routes
app.get('/api/needs', (req, res) => {
  const limit = parseInt(req.query.limit) || 0;
  res.json(limit ? needs.slice(0, limit) : needs);
});

app.get('/api/needs/:id', (req, res) => {
  const need = needs.find(n => n.id === req.params.id);
  if (!need) return res.status(404).json({ message: '需求不存在' });
  res.json(need);
});

app.post('/api/needs', authMiddleware, (req, res) => {
  const id = uuidv4();
  const need = { ...req.body, id, submitter: req.user.id, createdAt: new Date().toISOString(), votes: 0, status: 'draft' };
  needs.push(need);
  activities.push({ id: uuidv4(), description: `${req.user.name} 提交了新需求: ${need.title}`, createdAt: new Date().toISOString() });
  res.json(need);
});

app.put('/api/needs/:id', authMiddleware, (req, res) => {
  const need = needs.find(n => n.id === req.params.id);
  if (!need) return res.status(404).json({ message: '需求不存在' });
  if (need.submitter !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({ message: '无权限' });
  }
  Object.assign(need, req.body);
  res.json(need);
});

// Innovations routes
app.get('/api/innovations', (req, res) => {
  res.json(innovations);
});

app.get('/api/innovations/:id', (req, res) => {
  const innovation = innovations.find(i => i.id === req.params.id);
  if (!innovation) return res.status(404).json({ message: '方案不存在' });
  res.json(innovation);
});

app.post('/api/innovations', authMiddleware, (req, res) => {
  const id = uuidv4();
  const innovation = { ...req.body, id, submitter: req.user.id, createdAt: new Date().toISOString(), status: 'draft' };
  innovations.push(innovation);
  activities.push({ id: uuidv4(), description: `${req.user.name} 提交了新方案: ${innovation.title}`, createdAt: new Date().toISOString() });
  res.json(innovation);
});

app.put('/api/innovations/:id', authMiddleware, (req, res) => {
  const innovation = innovations.find(i => i.id === req.params.id);
  if (!innovation) return res.status(404).json({ message: '方案不存在' });
  if (innovation.submitter !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({ message: '无权限' });
  }
  Object.assign(innovation, req.body);
  res.json(innovation);
});

// Voting routes
app.get('/api/voting', (req, res) => {
  res.json(votingItems);
});

app.post('/api/voting/:id/vote', authMiddleware, (req, res) => {
  const item = votingItems.find(i => i.id === req.params.id);
  if (!item) return res.status(404).json({ message: '投票项目不存在' });
  if (item.votedUsers.includes(req.user.id)) {
    return res.status(400).json({ message: '已投票' });
  }
  item.votes += 1;
  item.votedUsers.push(req.user.id);
  activities.push({ id: uuidv4(), description: `${req.user.name} 为 ${item.title} 投票`, createdAt: new Date().toISOString() });
  res.json({ message: '投票成功' });
});

// Yearbooks routes
app.get('/api/yearbooks', (req, res) => {
  res.json(yearbooks);
});

// Events routes
app.get('/api/events', (req, res) => {
  res.json(events);
});

// Activities routes
app.get('/api/activities', (req, res) => {
  const limit = parseInt(req.query.limit) || 0;
  res.json(limit ? activities.slice(0, limit) : activities);
});

// Analytics routes
app.get('/api/analytics', (req, res) => {
  res.json({
    labels: ['1月', '2月', '3月', '4月', '5月'],
    needs: [10, 15, 8, 12, 20],
    innovations: [5, 8, 3, 7, 10],
  });
});

// Dashboard stats
app.get('/api/dashboard/stats', authMiddleware, (req, res) => {
  res.json({
    totalNeeds: needs.length,
    activeInnovations: innovations.length,
    pendingVotes: votingItems.reduce((sum, item) => sum + item.votes, 0),
    completedProjects: innovations.filter(i => i.status === 'approved').length,
  });
});

// Admin routes
app.get('/api/admin/users', authMiddleware, (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: '无权限' });
  res.json(users.map(u => ({ id: u.id, email: u.email, name: u.name, organization: u.organization, role: u.role })));
});

app.delete('/api/admin/users/:id', authMiddleware, (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: '无权限' });
  users = users.filter(u => u.id !== req.params.id);
  res.json({ message: '用户已删除' });
});

// Blockchain routes (simulated)
app.get('/api/blockchain/records/:type/:id', authMiddleware, (req, res) => {
  const record = blockchainRecords.find(r => r.type === req.params.type && r.recordId === req.params.id);
  if (!record) return res.status(404).json({ message: '记录不存在' });
  res.json(record);
});

app.post('/api/blockchain/verify', authMiddleware, (req, res) => {
  const { recordType, recordId } = req.body;
  const record = blockchainRecords.find(r => r.type === recordType && r.recordId === recordId);
  if (!record) {
    return res.status(404).json({ verified: false, message: '记录未上链' });
  }
  res.json({ verified: true, message: '数据验证通过', timestamp: record.timestamp });
});

app.get('/api/blockchain/transactions', authMiddleware, (req, res) => {
  res.json(blockchainRecords);
});

app.get('/api/blockchain/status', (req, res) => {
  res.json({
    connected: true,
    blockHeight: 1000,
    lastBlockTime: new Date().toISOString(),
    peerCount: 5,
  });
});

app.post('/api/blockchain/publish', authMiddleware, (req, res) => {
  const { recordType, recordId } = req.body;
  blockchainRecords.push({
    type: recordType,
    recordId,
    transactionHash: uuidv4(),
    blockHeight: 1001,
    timestamp: new Date().toISOString(),
  });
  res.json({ message: '记录已上链' });
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
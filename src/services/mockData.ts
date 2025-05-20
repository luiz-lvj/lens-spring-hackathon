
import { Group, Post, User, UserGroup, Investment } from '../types';

// Mock Users
export const users: User[] = [
  {
    id: 'user1',
    username: 'cryptoInvestor',
    role: 'investor',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
    joinedAt: new Date('2023-01-15')
  },
  {
    id: 'user2',
    username: 'cryptoManager',
    role: 'manager',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bubba',
    joinedAt: new Date('2022-11-20')
  },
  {
    id: 'user3',
    username: 'blockchainGuru',
    role: 'manager',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Coco',
    joinedAt: new Date('2023-03-10')
  },
  {
    id: 'user4',
    username: 'tokenTrader',
    role: 'investor',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Max',
    joinedAt: new Date('2023-02-05')
  }
];

// Mock Groups
export const groups: Group[] = [
  {
    id: 'group1',
    name: 'DeFi Innovators',
    description: 'Exploring the latest in decentralized finance opportunities',
    managerId: 'user2',
    coverImage: 'https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=3432&auto=format&fit=crop',
    memberCount: 156,
    createdAt: new Date('2023-01-20')
  },
  {
    id: 'group2',
    name: 'NFT Collectors',
    description: 'Investment opportunities in the NFT space',
    managerId: 'user3',
    coverImage: 'https://images.unsplash.com/photo-1622630998477-20aa696ecb05?q=80&w=3456&auto=format&fit=crop',
    memberCount: 89,
    createdAt: new Date('2023-02-15')
  },
];

// Mock User-Group Memberships
export const userGroups: UserGroup[] = [
  {
    userId: 'user1',
    groupId: 'group1',
    joinedAt: new Date('2023-01-25')
  },
  {
    userId: 'user4',
    groupId: 'group2',
    joinedAt: new Date('2023-02-20')
  }
];

// Mock Posts
export const posts: Post[] = [
  {
    id: 'post1',
    groupId: 'group1',
    title: 'Yield Farming Opportunity: StableYield Protocol',
    content: 'New yield farming opportunity with StableYield Protocol offering competitive APYs for stablecoin deposits.',
    investmentAmount: 50000,
    roi: 12.5,
    duration: '3 months',
    createdAt: new Date('2023-02-01'),
    createdBy: 'user2'
  },
  {
    id: 'post2',
    groupId: 'group1',
    title: 'Liquidity Mining Pool Launch',
    content: 'Exclusive access to the upcoming liquidity mining pool for a new DeFi protocol.',
    investmentAmount: 75000,
    roi: 18.2,
    duration: '6 months',
    createdAt: new Date('2023-02-10'),
    createdBy: 'user2'
  },
  {
    id: 'post3',
    groupId: 'group2',
    title: 'Blue Chip NFT Collection Investment',
    content: 'Opportunity to invest in a curated set of blue chip NFTs with high growth potential.',
    investmentAmount: 120000,
    roi: 25.0,
    duration: '12 months',
    createdAt: new Date('2023-03-05'),
    createdBy: 'user3'
  }
];

// Mock Investments
export const investments: Investment[] = [
  {
    id: 'inv1',
    userId: 'user1',
    postId: 'post1',
    amount: 5000,
    createdAt: new Date('2023-02-03')
  },
  {
    id: 'inv2',
    userId: 'user4',
    postId: 'post3',
    amount: 10000,
    createdAt: new Date('2023-03-10')
  }
];

// Auth state
let currentUser: User | null = users[0];

// Service functions
export const authService = {
  getCurrentUser: () => currentUser,
  login: (userId: string) => {
    const user = users.find(u => u.id === userId);
    if (user) {
      currentUser = user;
      return user;
    }
    return null;
  },
  logout: () => {
    currentUser = null;
  },
  switchRole: () => {
    if (!currentUser) return null;
    const newRole = currentUser.role === 'investor' ? 'manager' : 'investor';
    currentUser = {...currentUser, role: newRole};
    return currentUser;
  }
};

export const groupService = {
  getAllGroups: () => [...groups],
  getGroupById: (id: string) => groups.find(g => g.id === id) || null,
  getUserGroups: (userId: string) => {
    const membershipIds = userGroups
      .filter(ug => ug.userId === userId)
      .map(ug => ug.groupId);
    return groups.filter(g => membershipIds.includes(g.id) || g.managerId === userId);
  },
  joinGroup: (userId: string, groupId: string) => {
    const exists = userGroups.some(ug => ug.userId === userId && ug.groupId === groupId);
    if (!exists) {
      const newMembership: UserGroup = {
        userId,
        groupId,
        joinedAt: new Date()
      };
      userGroups.push(newMembership);
      
      // Update member count
      const groupIndex = groups.findIndex(g => g.id === groupId);
      if (groupIndex !== -1) {
        groups[groupIndex] = {
          ...groups[groupIndex],
          memberCount: groups[groupIndex].memberCount + 1
        };
      }
    }
  },
  createGroup: (name: string, description: string, managerId: string) => {
    const newGroup: Group = {
      id: `group${groups.length + 1}`,
      name,
      description,
      managerId,
      coverImage: `https://images.unsplash.com/photo-1621761191319-c6fb62004040?q=80&w=3387&auto=format&fit=crop`,
      memberCount: 1,
      createdAt: new Date()
    };
    groups.push(newGroup);
    return newGroup;
  }
};

export const postService = {
  getPostsByGroupId: (groupId: string) => posts.filter(p => p.groupId === groupId),
  getPostById: (id: string) => posts.find(p => p.id === id) || null,
  createPost: (groupId: string, title: string, content: string, investmentAmount: number, roi: number, duration: string, userId: string) => {
    const newPost: Post = {
      id: `post${posts.length + 1}`,
      groupId,
      title,
      content,
      investmentAmount,
      roi,
      duration,
      createdAt: new Date(),
      createdBy: userId
    };
    posts.push(newPost);
    return newPost;
  }
};

export const investmentService = {
  getUserInvestments: (userId: string) => investments.filter(i => i.userId === userId),
  createInvestment: (userId: string, postId: string, amount: number) => {
    const newInvestment: Investment = {
      id: `inv${investments.length + 1}`,
      userId,
      postId,
      amount,
      createdAt: new Date()
    };
    investments.push(newInvestment);
    return newInvestment;
  },
  hasInvested: (userId: string, postId: string) => 
    investments.some(i => i.userId === userId && i.postId === postId)
};

export const userService = {
  getUserById: (id: string) => users.find(u => u.id === id) || null,
  isGroupMember: (userId: string, groupId: string) => {
    return userGroups.some(ug => ug.userId === userId && ug.groupId === groupId) || 
      groups.some(g => g.id === groupId && g.managerId === userId);
  }
};

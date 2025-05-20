
export type UserRole = 'investor' | 'manager';

export interface User {
  id: string;
  username: string;
  role: UserRole;
  avatar: string;
  joinedAt: Date;
}

export interface Group {
  id: string;
  name: string;
  description: string;
  managerId: string;
  coverImage: string;
  memberCount: number;
  createdAt: Date;
}

export interface Post {
  id: string;
  groupId: string;
  title: string;
  content: string;
  investmentAmount: number;
  roi: number; // Return on Investment percentage
  duration: string;
  createdAt: Date;
  createdBy: string;
}

export interface Investment {
  id: string;
  userId: string;
  postId: string;
  amount: number;
  createdAt: Date;
}

export interface UserGroup {
  userId: string;
  groupId: string;
  joinedAt: Date;
}

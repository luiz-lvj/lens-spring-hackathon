import { fetchGroups } from "@lens-protocol/client/actions";
import { lensClient } from "@/lib/lens/client";

export interface Group {
  id: string;
  name: string;
  description: string;
  avatar?: string;
  membersCount: number;
  createdAt: string;
  address: string;
  owner: string;
  banningEnabled: boolean;
  membershipApprovalEnabled: boolean;
}

export async function getGroups(searchQuery?: string) {
  try {
    const result = await fetchGroups(lensClient, {
      filter: {
        searchQuery,
      },
    });

    if (result.isErr()) {
      throw new Error(result.error.message);
    }

    const { items, pageInfo } = result.value;
    return {
      groups: items.map((group) => ({
        id: group.metadata.id,
        name: group.metadata.name,
        description: group.metadata.description,
        avatar: group.metadata.icon?.url,
        address: group.address,
        owner: group.owner,
        banningEnabled: group.banningEnabled,
        membershipApprovalEnabled: group.membershipApprovalEnabled,
        createdAt: group.timestamp,
      })),
      pageInfo,
    };
  } catch (error) {
    console.error("Error fetching groups:", error);
    throw error;
  }
}

export async function getGroupByAddress(address: string) {
  try {
    const result = await fetchGroups(lensClient, {
      filter: {
        managedBy: {
          address,
          includeOwners: true,
        },
      },
    });

    if (result.isErr()) {
      throw new Error(result.error.message);
    }

    const group = result.value.items[0];
    if (!group) {
      throw new Error("Group not found");
    }

    return {
      id: group.metadata.id,
      name: group.metadata.name,
      description: group.metadata.description,
      avatar: group.metadata.icon?.url,
      address: group.address,
      owner: group.owner,
      banningEnabled: group.banningEnabled,
      membershipApprovalEnabled: group.membershipApprovalEnabled,
      createdAt: group.timestamp,
    };
  } catch (error) {
    console.error("Error fetching group:", error);
    throw error;
  }
} 

export async function getGroupByManager(managerAddress: string) {
  try {
    const result = await fetchGroups(lensClient, {
      filter: {
        managedBy: {
          address: managerAddress,
          includeOwners: true,
        },
      },
    });

    console.log("result", result);

    if (result.isErr()) {
      throw new Error(result.error.message);
    }

    return result.value.items;
  } catch (error) {
    console.error("Error fetching group:", error);
    throw error;
  }
}

import { useQuery } from "@tanstack/react-query";
import { getGroups, getGroupByAddress, type Group, getGroupByManager } from "@/services/lens/groups";

export function useGroups(searchQuery?: string) {
  return useQuery({
    queryKey: ["groups", searchQuery],
    queryFn: () => getGroups(searchQuery),
  });
}

export function useGroup(address: string) {
  return useQuery({
    queryKey: ["group", address],
    queryFn: () => getGroupByAddress(address),
    enabled: !!address,
  });
} 

export function useGroupByManager(managerAddress: string) {
  return useQuery({
    queryKey: ["groupByManager", managerAddress],
    queryFn: () => getGroupByManager(managerAddress),
  });
}
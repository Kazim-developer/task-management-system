import { create } from "zustand";

const storeFunc = (set: any) => ({
  showCreateTeamModal: false,
  showAddMemberModal: false,
  showAssignTaskModal: false,

  setShowCreateTeamModal: (value: boolean) =>
    set({ showCreateTeamModal: value }),

  setShowAddMemberModal: (value: boolean) => set({ showAddMemberModal: value }),

  setShowAssignTaskModal: (value: boolean) =>
    set({ showAssignTaskModal: value }),
});

const useShowElementStore = create(storeFunc);

export default useShowElementStore;

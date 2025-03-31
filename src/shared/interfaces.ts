export interface BeeInterface {
  type: string;
  healthPoints: number;
}

export interface UserInterface {
  userName: string;
}

export type SwarmMembersType = {
  [key: string]: number;
};

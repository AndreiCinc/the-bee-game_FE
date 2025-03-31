export interface BeeInterface {
  type: string;
  healthPoints: number;
}

export interface UserInterface {
  name: string;
}

export type SwarmMembersType = {
  [key: string]: number;
};

export type BeeType = "Worker" | "Drone" | "Queen";

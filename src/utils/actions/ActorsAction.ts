import { Action } from "./Action";

export class ActorsAction {
  private static _ActorsActionSet = new Action();

  public static Add(func: () => void): void {
    this._ActorsActionSet.set(func);
  }

  public static Remove(func: () => void): void {
    this._ActorsActionSet.remove(func);
  }

  public static Dispatch(): void {
    this._ActorsActionSet.execute();
  }
}
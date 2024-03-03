import { Action } from "./Action";

export class LoginsAction {
  private static _Actions = new Action();

  public static Add(func: () => void): void {
    this._Actions.set(func);
  }

  public static Remove(func: () => void): void {
    this._Actions.remove(func);
  }

  public static Dispatch(): void {
    this._Actions.execute();
  }
}
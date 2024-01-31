export class Action {
  private _actions = new Set<() => void>();
  
  public set(func: () => void): void {
    this._actions.add(func);
  }

  public remove(func: () => void): void {
    this._actions.delete(func);
  }

  public execute(): void {
    for(const action of this._actions) {
      action();
    }
  }
}
export type IdMap = Map<number, number>;

export class Parents {
  private parents = new Map<number, number>();

  findParent(nodeId: number): number {
    let parent = this.parents.get(nodeId);
    while (parent && nodeId !== parent) {
      const grandparent = this.findParent(parent);
      if (grandparent) {
        this.parents.set(nodeId, grandparent);
      }
      nodeId = parent;
      parent = this.parents.get(nodeId);
    }
    return nodeId;
  }

  set(key: number, value: number): void {
    this.parents.set(key, value);
  }

  toIdMap(): IdMap {
    const copy = new Map<number, number>();
    this.parents.forEach((val: number, key: number) => copy.set(key, val));
    return copy;
  }
}

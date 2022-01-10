import { Injectable } from '@nestjs/common';
import { MazeDto, SearchDto, SearchTypeEnum, PosnDto, IdMap } from '../dto';
import { Worklist, BfsList, LifoList } from '../utils';

@Injectable()
export class SearchService {
  search(
    maze: MazeDto,
    type: SearchTypeEnum,
    source: PosnDto,
    target: PosnDto,
  ) {
    const worklist = SearchService.searchWorklist(
      type,
      maze.posnToNode(source),
    );
    return SearchService.findTarget(worklist, maze, maze.posnToNode(target));
  }

  private static searchWorklist(
    type: SearchTypeEnum,
    first: number,
  ): Worklist<number> {
    let n: Worklist<number> = new LifoList();
    switch (type) {
      case SearchTypeEnum.BFS:
        n = new BfsList<number>();
        n.add(first);
        break;
      case SearchTypeEnum.DFS:
        n.add(first);
        break;
      case SearchTypeEnum.NONE:
        break;
    }
    return n;
  }

  private static findTarget(
    worklist: Worklist<number>,
    maze: MazeDto,
    target: number,
  ): SearchDto {
    const found: IdMap = new Map<number, number>();
    const parents: IdMap = new Map<number, number>();

    while (!worklist.isEmpty()) {
      SearchService.searchNode(worklist, maze, target, found, parents);
    }

    return {
      found,
      parents,
      path: SearchService.reconstructPath(parents, target),
    };
  }

  private static searchNode(
    worklist: Worklist<number>,
    maze: MazeDto,
    target: number,
    found: IdMap,
    parents: IdMap,
  ): void {
    const next = worklist.removeNext();
    if (next !== null && !found.has(next)) {
      found.set(next, found.size + 1);
      if (next === target) {
        worklist.removeAll();
      } else {
        const nodesToProcess = SearchService.getNodeNeighbors(next, maze);
        nodesToProcess.filter((neighbor) => !found.has(neighbor));
        nodesToProcess.forEach((neighbor) => {
          if (!found.has(neighbor)) {
            worklist.add(neighbor);
            parents.set(neighbor, next);
          }
        });
      }
    }
  }

  private static getNodeNeighbors(node: number, maze: MazeDto): number[] {
    const neighbors: number[] = [];
    maze.edges[node].forEach((edge) => {
      neighbors.push(edge.second);
    });
    return neighbors;
  }

  private static reconstructPath(parents: IdMap, target: number): IdMap {
    const path = new Map<number, number>();
    let at = target;
    let order = 0;
    while (at !== 0) {
      path.set(at, order);
      const parent = parents.get(at);
      if (parent !== undefined) {
        at = parent;
        order++;
      }
    }
    path.set(at, order);
    return path;
  }
}

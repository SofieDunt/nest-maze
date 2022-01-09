import { Injectable } from '@nestjs/common';
import Maze from '../types/maze';
import SearchTypes from '../types/searchTypes';
import Worklist from '../utils/worklist';
import BfsList from '../utils/bfsList';
import LifoList from '../utils/lifoList';
import { SearchResult } from '../types/searchResult';
import { IdMap } from '../utils/parents';

@Injectable()
export class SearchService {
  search(maze: Maze, type: SearchTypes, source: number, target: number) {
    const worklist = SearchService.searchWorklist(type, source);
    return SearchService.findTarget(worklist, maze, target);
  }

  private static searchWorklist(
    type: SearchTypes,
    first: number,
  ): Worklist<number> {
    let n: Worklist<number>;
    if (type === SearchTypes.BFS) {
      n = new BfsList<number>();
    } else {
      n = new LifoList<number>();
    }
    if (type !== SearchTypes.NONE) {
      n.add(first);
    }
    return n;
  }

  private static findTarget(
    worklist: Worklist<number>,
    maze: Maze,
    target: number,
  ): SearchResult {
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
    maze: Maze,
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

  private static getNodeNeighbors(node: number, maze: Maze): number[] {
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

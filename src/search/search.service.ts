import { Injectable } from '@nestjs/common';
import {
  MazeDto,
  SearchDto,
  SearchTypeEnum,
  IdMap,
  KeyValDto,
  MapMapper,
} from '../dto';
import { Worklist, BfsList, LifoList } from '../utils';

@Injectable()
export class SearchService {
  async search(
    maze: MazeDto,
    type: SearchTypeEnum,
    source: number,
    target: number,
  ): Promise<SearchDto> {
    const worklist = SearchService.searchWorklist(type, source);
    return SearchService.findTarget(worklist, maze, source, target);
  }

  private static async reconstructPath(
    parents: IdMap,
    source: number,
    target: number,
  ): Promise<KeyValDto[]> {
    const path = new Map<number, number>();
    let at = target;
    let order = 0;
    while (at !== source) {
      path.set(at, order);
      const parent = parents.get(at);
      if (parent !== undefined) {
        at = parent;
        order++;
      } else {
        break;
      }
    }
    path.set(source, order);
    return MapMapper.mapIdMap(path);
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

  private static async findTarget(
    worklist: Worklist<number>,
    maze: MazeDto,
    source: number,
    target: number,
  ): Promise<SearchDto> {
    const found: IdMap = new Map<number, number>();
    const parents: IdMap = new Map<number, number>();

    while (!worklist.isEmpty()) {
      SearchService.searchNode(worklist, maze, target, found, parents);
    }

    const path = await SearchService.reconstructPath(parents, source, target);
    return new SearchDto(found, parents, path);
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
}

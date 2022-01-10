import { Injectable } from '@nestjs/common';
import { MazeDto, MazeNodeDto, PosnDto, EdgeDto } from '../dto';
import {
  getRandomInt,
  Parents,
  MinHeapImpl,
  EdgeComparator,
  lolLength,
} from '../utils';

@Injectable()
export class MazeService {
  async construct(xDim: number, yDim: number, bias: number): Promise<MazeDto> {
    xDim = Math.max(1, Math.ceil(xDim));
    yDim = Math.max(1, Math.ceil(yDim));

    let horizontalCap = 100;
    let verticalCap = 100;
    if (bias < 0) {
      horizontalCap = 50;
      verticalCap = 100 * Math.abs(bias);
    } else if (bias > 0) {
      horizontalCap = 100 * bias;
      verticalCap = 50;
    }

    const nodes = MazeService.constructNodes(xDim, yDim);
    const edges = MazeService.constructMST(
      nodes,
      xDim,
      yDim,
      horizontalCap,
      verticalCap,
    );

    return new MazeDto(xDim, yDim, bias, nodes, edges);
  }

  /**
   * Constructs every node of a board.
   * @param xDim the x-dimension of the board
   * @param yDim the y-dimension of the board
   */
  private static constructNodes(xDim: number, yDim: number): MazeNodeDto[] {
    const nodes: MazeNodeDto[] = [];
    const numNodes = xDim * yDim;

    let id = 0;
    for (let row = 0; row < yDim; row++) {
      for (let col = 0; col < xDim; col++) {
        nodes.push(new MazeNodeDto(id, new PosnDto(col, row)));
        id++;
      }
    }

    nodes[0] = new MazeNodeDto(0, new PosnDto(0, 0));
    nodes[numNodes - 1] = new MazeNodeDto(
      numNodes - 1,
      new PosnDto(xDim - 1, yDim - 1),
    );
    return nodes;
  }

  /**
   * Constructs every potential (to right or to bottom) edge between the given nodes.
   * @param nodes the nodes
   * @param xDim the x-dimension of the board
   * @param yDim the y-dimension of the board
   * @param horizontalCap the cap on horizontal edge weights
   * @param verticalCap the cap on vertical edge weights
   */
  private static constructEdges(
    nodes: MazeNodeDto[],
    xDim: number,
    yDim: number,
    horizontalCap: number,
    verticalCap: number,
  ): EdgeDto[][] {
    const edges: EdgeDto[][] = [];
    nodes.forEach((node: MazeNodeDto, id) => {
      const nodeEdges = [];
      const pos = node.posn;
      // right neighbor
      if ((pos.x % xDim) + 1 < xDim) {
        nodeEdges.push(new EdgeDto(id, id + 1, getRandomInt(horizontalCap)));
      }
      // bottom neighbor
      if ((pos.y % yDim) + 1 < yDim) {
        nodeEdges.push(new EdgeDto(id, id + xDim, getRandomInt(verticalCap)));
      }
      edges.push(nodeEdges);
    });
    return edges;
  }

  /**
   * Does the edge create a cycle?
   * @param parents the parents of each node
   * @param edge the edge to check
   */
  private static cycles(parents: Parents, edge: EdgeDto): boolean {
    return parents.findParent(edge.first) === parents.findParent(edge.second);
  }

  /**
   * Uses Kruskal's to make an MST from all potential edges.
   * @param nodes all nodes in the board
   * @param xDim the x-dimension of the board
   * @param yDim the y-dimension of the board
   * @param horizontalCap the cap on horizontal edge weights
   * @param verticalCap the cap on vertical edge weights
   */
  private static constructMST(
    nodes: MazeNodeDto[],
    xDim: number,
    yDim: number,
    horizontalCap: number,
    verticalCap: number,
  ): EdgeDto[][] {
    const edges = MazeService.constructEdges(
      nodes,
      xDim,
      yDim,
      horizontalCap,
      verticalCap,
    );
    const numTreeEdges = nodes.length - 1;
    const treeEdges: EdgeDto[][] = [];
    const parents = new Parents();
    edges.forEach((es, id) => parents.set(id, id));
    const worklist = new MinHeapImpl(new EdgeComparator());
    edges.forEach((es) => {
      treeEdges.push([]);
      es.forEach((edge) => {
        worklist.insert(edge);
      });
    });

    while (lolLength(treeEdges) < numTreeEdges * 2) {
      const nextEdge = worklist.extractRoot();
      if (nextEdge && !MazeService.cycles(parents, nextEdge)) {
        treeEdges[nextEdge.first].push(nextEdge);
        treeEdges[nextEdge.second].push(
          new EdgeDto(nextEdge.second, nextEdge.first, nextEdge.weight),
        );
        parents.set(
          parents.findParent(nextEdge.first),
          parents.findParent(nextEdge.second),
        );
      }
    }

    return treeEdges;
  }
}

import Edge from './edge';
import MazeNode from './mazeNode';
import Posn from './posn';
import { getRandomInt } from '../utils/rand';
import { MinHeapImpl } from '../utils/heap';
import EdgeComparator from '../utils/edgeComparator';
import lolLength from '../utils/lol';
import Parents from '../utils/parents';

export default class Maze {
  readonly xDim: number;
  readonly yDim: number;
  readonly bias: number;
  readonly nodes: MazeNode[];
  readonly edges: Edge[][];

  constructor(xDim: number, yDim: number, bias: number) {
    this.xDim = xDim;
    this.yDim = yDim;
    this.bias = bias;

    let horizontalCap = 100;
    let verticalCap = 100;
    if (bias < 0) {
      horizontalCap = 50;
      verticalCap = 100 * Math.abs(bias);
    } else if (bias > 0) {
      horizontalCap = 100 * bias;
      verticalCap = 50;
    }

    this.nodes = this.constructNodes();
    this.edges = this.constructMST(horizontalCap, verticalCap);
  }

  posnToNode(posn: Posn): number {
    return posn.x + posn.y * this.xDim;
  }

  /**
   * Constructs every node in the board.
   */
  private constructNodes(): MazeNode[] {
    const nodes: MazeNode[] = [];
    const numNodes = this.xDim * this.yDim;

    let id = 0;
    for (let row = 0; row < this.yDim; row++) {
      for (let col = 0; col < this.xDim; col++) {
        nodes.push(new MazeNode(id, new Posn(col, row)));
        id++;
      }
    }

    nodes[0] = new MazeNode(0, new Posn(0, 0));
    nodes[numNodes - 1] = new MazeNode(
      numNodes - 1,
      new Posn(this.xDim - 1, this.yDim - 1),
    );
    return nodes;
  }

  /**
   * Constructs every potential (to right or to bottom) edge between the given nodes.
   * @param horizontalCap the cap on horizontal edge weights
   * @param verticalCap the cap on vertical edge weights
   */
  private constructEdges(horizontalCap: number, verticalCap: number): Edge[][] {
    const edges: Edge[][] = [];
    this.nodes.forEach((node: MazeNode, id) => {
      const nodeEdges = [];
      const pos = node.posn;
      // right neighbor
      if ((pos.x % this.xDim) + 1 < this.xDim) {
        nodeEdges.push(new Edge(id, id + 1, getRandomInt(horizontalCap)));
      }
      // bottom neighbor
      if ((pos.y % this.yDim) + 1 < this.yDim) {
        nodeEdges.push(new Edge(id, id + this.xDim, getRandomInt(verticalCap)));
      }
      edges.push(nodeEdges);
    });
    return edges;
  }

  /**
   * Uses Kruskal's to make an MST from all potential edges.
   * @param horizontalCap the cap on horizontal edge weights
   * @param verticalCap the cap on vertical edge weights
   */
  private constructMST(horizontalCap: number, verticalCap: number): Edge[][] {
    const edges = this.constructEdges(horizontalCap, verticalCap);
    const numTreeEdges = this.nodes.length - 1;
    const treeEdges: Edge[][] = [];
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
      if (nextEdge && !nextEdge.cycles(parents)) {
        treeEdges[nextEdge.first].push(nextEdge);
        treeEdges[nextEdge.second].push(
          new Edge(nextEdge.second, nextEdge.first, nextEdge.weight),
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

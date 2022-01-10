import { Injectable } from '@nestjs/common';
import { MazeDto, PosnDto, MazeNodeDto } from '../dto';
import { Directions } from '../utils';

@Injectable()
export class NavigateService {
  move(player: PosnDto, maze: MazeDto, direction: Directions): PosnDto {
    if (NavigateService.canMove(player, maze, direction)) {
      switch (direction) {
        case Directions.LEFT:
          return new PosnDto(player.x - 1, player.y);
        case Directions.RIGHT:
          return new PosnDto(player.x + 1, player.y);
        case Directions.UP:
          return new PosnDto(player.x, player.y - 1);
        case Directions.DOWN:
          return new PosnDto(player.x, player.y + 1);
        default:
          return player;
      }
    } else {
      return player;
    }
  }

  private static canMove(
    player: PosnDto,
    maze: MazeDto,
    direction: Directions,
  ): boolean {
    switch (direction) {
      case Directions.LEFT:
        return (
          player.x - 1 >= 0 &&
          NavigateService.hasPathToRight(
            maze.nodes[maze.posnToNode(player) - 1],
            maze,
          )
        );
      case Directions.RIGHT:
        return (
          player.x + 1 < maze.xDim &&
          NavigateService.hasPathToRight(
            maze.nodes[maze.posnToNode(player)],
            maze,
          )
        );
      case Directions.UP:
        return (
          player.y - 1 >= 0 &&
          NavigateService.hasPathToBottom(
            maze.nodes[maze.posnToNode(player) - maze.xDim],
            maze,
          )
        );
      case Directions.DOWN:
        return (
          player.y + 1 < maze.yDim &&
          NavigateService.hasPathToBottom(
            maze.nodes[maze.posnToNode(player)],
            maze,
          )
        );
      default:
        return false;
    }
  }

  private static hasPathToRight(node: MazeNodeDto, maze: MazeDto): boolean {
    const outEdges = maze.edges[node.id];
    let bool = (node.posn.x % maze.xDim) + 1 === maze.xDim;
    outEdges.forEach((edge) => {
      if (edge.second === node.id + 1) {
        bool = true;
      }
    });
    return bool;
  }

  private static hasPathToBottom(node: MazeNodeDto, maze: MazeDto): boolean {
    const outEdges = maze.edges[node.id];
    let bool = (node.posn.y % maze.yDim) + 1 === maze.yDim;
    outEdges.forEach((edge) => {
      if (edge.second === node.id + maze.xDim) {
        bool = true;
      }
    });
    return bool;
  }
}

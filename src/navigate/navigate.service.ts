import { Injectable } from '@nestjs/common';
import {
  MazeDto,
  PosnDto,
  MazeNodeDto,
  DirectionEnum,
  PlayerDto,
} from '../dto';

@Injectable()
export class NavigateService {
  move(player: PosnDto, maze: MazeDto, direction: DirectionEnum): PlayerDto {
    let playerPosn: PosnDto;
    if (NavigateService.canMove(player, maze, direction)) {
      switch (direction) {
        case DirectionEnum.LEFT:
          playerPosn = new PosnDto(player.x - 1, player.y);
          break;
        case DirectionEnum.RIGHT:
          playerPosn = new PosnDto(player.x + 1, player.y);
          break;
        case DirectionEnum.UP:
          playerPosn = new PosnDto(player.x, player.y - 1);
          break;
        case DirectionEnum.DOWN:
          playerPosn = new PosnDto(player.x, player.y + 1);
          break;
        default:
          playerPosn = player;
      }
    } else {
      playerPosn = player;
    }
    return new PlayerDto(playerPosn, maze.posnToNode(playerPosn));
  }

  private static canMove(
    player: PosnDto,
    maze: MazeDto,
    direction: DirectionEnum,
  ): boolean {
    switch (direction) {
      case DirectionEnum.LEFT:
        return (
          player.x - 1 >= 0 &&
          NavigateService.hasPathToRight(
            maze.nodes[maze.posnToNode(player) - 1],
            maze,
          )
        );
      case DirectionEnum.RIGHT:
        return (
          player.x + 1 < maze.xDim &&
          NavigateService.hasPathToRight(
            maze.nodes[maze.posnToNode(player)],
            maze,
          )
        );
      case DirectionEnum.UP:
        return (
          player.y - 1 >= 0 &&
          NavigateService.hasPathToBottom(
            maze.nodes[maze.posnToNode(player) - maze.xDim],
            maze,
          )
        );
      case DirectionEnum.DOWN:
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

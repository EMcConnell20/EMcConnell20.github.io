/* tslint:disable */
/* eslint-disable */
export function simplify(expression: string, parser: Parser): string;
export class Parser {
  private constructor();
  free(): void;
  static new(): Parser;
  create_keyword(name: string, expression: string): string;
  remove_keyword(name: string): void;
}

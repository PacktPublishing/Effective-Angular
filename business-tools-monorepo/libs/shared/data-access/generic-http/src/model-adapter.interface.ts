export interface ModelAdapter<T, S> {
  fromDto(dto: T): S;
  toDto(model: S): T;
}

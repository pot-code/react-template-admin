export interface FormModelAdapter<F, M> {
  fromModel(model: M): F
  toModel(form: F): M
}
